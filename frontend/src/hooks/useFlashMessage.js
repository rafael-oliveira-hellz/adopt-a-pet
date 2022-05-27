import bus from "../utils/bus";

export default function UseFlashMessage() {
    
    const setFlashMessage = (message, type) => {
        bus.emit("flashMessage", { 
            message: message, 
            type: type
        });
    }

    return { setFlashMessage };
        
}