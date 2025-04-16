export const fileUpload = async(file) => {
    if(!file) {
        throw new Error("No tenemos ningun archivo a subir");
    }
    const cloudUrl = "https://api.cloudinary.com/v1_1/dsgpxihej/upload";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "react-journal");
    try {
        const response = await fetch(cloudUrl, {
            method: "POST",
            body: formData
        });
        if(!response.ok) {
            throw new Error("No se pudo subir imagen");
        }
        const cloudResp = await response.json();
        return cloudResp;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}