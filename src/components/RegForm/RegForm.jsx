import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../features/productSlice';
import "./RegForm.css"
import SlideShow from '../SlideShow/SlideShow';
import modelOptions from './modelData';


const RegForm = () => {
    const host = "http://localhost:5000";
    const [formState, setFormState] = useState({
        category: '',
        model: '',
        serialNum: '',
        dateOfInvoice: '',
        productImage: '',
    });

    const [selectedModelOptions, setSelectedModelOptions] = useState([]); // State for model options based on category

    const [selectedFile, setSelectedFile] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        setSelectedModelOptions(modelOptions[formState.category] || []);
    }, [formState.category]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };


    const handleImageChange = (e) => {
        if(!e.target.files){ // cheking if it exists or not
            return
        }

        const file = e.target.files[0];

        setFormState((prevState) => ({
            ...prevState,
            productImage: file.name, // Access the first selected file
        }));
        // console.log(formState)

        setSelectedFile(file);
        if (!file || !file.type.startsWith('image/')) {
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setSelectedFile(file);
        handleImageChange(e); // Reusimg handleFileChange for validation and preview
      };



    const handleSubmit = async (e) => {
        e.preventDefault();
        const { category, model, serialNum, dateOfInvoice, productImage } = formState;
        dispatch(addProduct({ category, model, serialNum, dateOfInvoice, productImage }));
        const selectedFile = e.target.elements.productImage.files[0];

        const formData = new FormData();
        formData.append('category', category);
        formData.append('model', model);
        formData.append('serialNum', serialNum);
        formData.append('dateOfInvoice', dateOfInvoice);
        formData.append('productImage', selectedFile);

        await fetch(`${host}/api/products/upload`, {
            method: 'POST',
            body: formData,
        }).then(()=>{
            setSelectedFile(null);
            setFormState({
            category: '',
            model: '',
            serialNum: '',
            dateOfInvoice: '',
            productImage: '',
        })
        }).catch((e)=>{
            console.log('cant connect to backend!')
        })

        
    }



    // EVENT LISTNERS HERE



    return (
        <div className="regFormWrapper">
            <div className="form-left">
                <div className="slideshow-container">
                    <SlideShow />
                </div>
                <div className="carousel-text">
                    "Behold the Bottles, an embodiment of timeless beauty and charm with its clear, radiant glass."
                </div>
            </div>

            <div className="form-right">
                {/* <form id="productForm" action="/api/products/upload" method="post" encType="multipart/form-data"> */}
                <form id="productForm" onSubmit={handleSubmit} method="post" encType="multipart/form-data">
                    <h1>Register your product</h1>

                    <div className="inp-type-one-container">
                        <div className="inp-type-one">
                            <label htmlFor="category">Category</label>
                            <select value={formState.category} onChange={handleChange} id="category" name="category" required>
                                <option value="">Select category</option>
                                <option value="electronics">Electronics</option>
                                <option value="furniture">Furniture</option>
                                <option value="clothing">Clothing</option>
                                <option value="sports">Sports</option>
                            </select>
                        </div>

                        <div className="inp-type-one">
                            <label htmlFor="model">Model</label>
                            <select value={formState.model} onChange={handleChange} name="model" id="model">
                                <option value="" className="option-st">Select Model</option>
                                {selectedModelOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.text}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="inp-type-one">
                            <label htmlFor="serialNum">
                                Serial Number <span className="red-text">*</span>
                            </label>
                            <input placeholder='Enter serial number' value={formState.serialNum} onChange={handleChange} type="text" id="serialNum" name="serialNum" required />
                        </div>

                        <div className="inp-type-one">
                            <label htmlFor="dateOfInvoice">
                                Date of Invoice
                            </label>
                            <input value={formState.dateOfInvoice}
                                onChange={handleChange}
                                type='date'
                                id="dateOfInvoice"
                                name="dateOfInvoice"
                                required
                                placeholder="Select Date"
                            />
                        </div>
                    </div>

                    <div className="uploadBoxContainer" >
                        <div className="uploadBoxLabelText">Upload File</div>
                        <input
                            onChange={handleImageChange}
                            type="file"
                            id="productImage"
                            name="productImage"
                            accept="image/*"
                            required
                            hidden
                        />
                        <label htmlFor="productImage" className="uploadBox" onDragOver={handleDragOver} onDrop={handleDrop}>
                            {selectedFile ? (
                                <span>
                                    {selectedFile.name} uploaded successfully✅
                                </span>
                            ) : (
                                <strong className="uploadingBoxText" id="labelText">
                                    Drag files here or <span className="red-text">Browse</span>
                                </strong>
                            )}
                        </label>

                        <div className="upBtnContainer">
                            <button className={`uploadBtn ${selectedFile?"":"inactive"}`} type="submit">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
                <button className="close-btn">x</button>
            </div>

        </div>
    );
};

export default RegForm;