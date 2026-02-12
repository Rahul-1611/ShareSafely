import { useState } from "react"
import UploadIcon from '../assets/upload.svg';
const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;


function Upload({ onSuccess, setLoading }) {
    const [file, setFile] = useState(null);
    const [expiry, setExpiry] = useState("600");

    const fileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.size > MAX_FILE_SIZE_BYTES) {
            alert(`File is too large. Max size is ${MAX_FILE_SIZE_MB} MB.`);
            return;
        }
        setFile(selectedFile);
    }
    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.size > MAX_FILE_SIZE_BYTES) {
            alert(`File is too large. Max size is ${MAX_FILE_SIZE_MB} MB.`);
            return;
        }
        setFile(droppedFile);
    };

    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64Data = reader.result.split(',')[1];
                resolve({
                    name: file.name,
                    data: base64Data,
                    contentType: file.type
                });
            };
            reader.onerror = reject;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert("Please select a file before submitting.");
            return;
        }
        setLoading(true);

        try {
            // Convert file to Base64 using async/await
            const fileBase64 = await fileToBase64(file);

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/UploadFile`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    file: fileBase64,
                    expiry: expiry,
                    contentType: file.type
                }),
            });

            const result = await response.json();
            onSuccess(result.link);
        } catch (err) {
            console.error("Upload failed:", err);
            alert("Upload failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }
    return (
        <form onSubmit={handleSubmit} className="w-full justify-center items-center max-w-md mx-auto p-4 flex flex-col gap-4">

            {/* Dropdown for link expiry */}
            <label className="text-sm font-medium w-full text-orange">
                Link Expiration:
                <select
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="mt-1 block w-full rounded border-olive bg-peach text-orange shadow-sm 
             focus:outline-none focus:ring-2 focus:ring-orange focus:border-orange text-md p-2"
                >
                    <option value="600">10min</option>
                    <option value="3600">1 Hour</option>
                    <option value="86400">1 Day</option>
                </select>
            </label>

            {/* Drop zone box */}
            <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => document.getElementById("fileInput").click()}
                className="w-full p-6 text-center cursor-pointer border-2 border-dashed border-olive bg-peach hover:bg-cream rounded-lg transition-colors duration-300 ease-in-out"
            >
                {file ? (
                    <div className="text-sm font-medium text-olive">
                        <p>{file.name}</p>
                        <span className="text-xs text-olive">
                            ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                    </div>
                ) : (
                    <div>
                        <img
                            src={UploadIcon}
                            alt="Upload Icon"
                            className="mx-auto mb-2 h-10 w-10"
                        />
                        <p className="text-sm font-medium text-orange">Drag & drop a file here or click to upload</p>
                        <p className="text-xs text-olive mt-1">Supported formats: PDF, PNG, JPG, DOCX, JPEG, PNG</p>
                    </div>
                )}
                <input
                    id="fileInput"
                    type="file"
                    onChange={fileChange}
                    className="hidden"
                />
            </div>



            {/* Submit button */}
            <button
                type="submit"
                className="w-full bg-peach text-orange font-semibold py-2 px-4 rounded hover:border-2 hover:border-olive border-2 border-cream border-solid transition"
            >
                Generate Link
            </button>
        </form>

    )
}
export default Upload