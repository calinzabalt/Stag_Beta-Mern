import React, { useState, useEffect } from "react";
import { CirclePicker } from "react-color";

function Theme() {
    const [color, setColor ] = useState('');
  
    useEffect(() =>{
        const currentColor = JSON.parse(localStorage.getItem("theme-color"));
                            
        if (currentColor){
            setColor(currentColor);
        } 
    }, [color]);

    const handleClick = (theme) => {
        setColor(theme);
        localStorage.setItem("theme-color", JSON.stringify(theme));
    }

    const onSubmit = () => {
        window.location = '/';
    }

    return(
        <div className="theme-color">
            <div className="show_color_picker">
                <svg id="icons" enable-background="new 0 0 64 64" height="512" viewBox="0 0 64 64" width="512"><path d="m63 32h-10c0-5.801-2.35-11.051-6.15-14.851l7.07-7.069c5.61 5.609 9.08 13.359 9.08 21.92z" fill="#f6bb42"/><path d="m53 32h10c0 8.55-3.46 16.3-9.08 21.909l-7.07-7.06c3.8-3.799 6.15-9.049 6.15-14.849z" fill="#8cc152"/><path d="m53.92 53.909v.011c-5.61 5.609-13.35 9.08-21.92 9.08v-10c5.8 0 11.05-2.351 14.85-6.15z" fill="#37bc9b"/><path d="m53.92 10.08-7.07 7.069c-3.8-3.799-9.05-6.149-14.85-6.149v-10c8.57 0 16.31 3.47 21.92 9.08z" fill="#e9573f"/><path d="m53 32h-9.99-.01c0-3.04-1.23-5.79-3.22-7.78l7.069-7.07c3.801 3.799 6.151 9.049 6.151 14.85z" fill="#ffce54"/><path d="m39.78 39.779 7.069 7.07c-3.799 3.8-9.049 6.151-14.849 6.151v-10c3.04 0 5.79-1.23 7.78-3.221z" fill="#48cfad"/><path d="m32 53v10c-8.56 0-16.31-3.471-21.92-9.08l7.07-7.07c3.8 3.799 9.06 6.15 14.85 6.15z" fill="#4a89dc"/><path d="m32 43v10c-5.79 0-11.05-2.351-14.85-6.15l7.069-7.07c1.991 1.99 4.751 3.22 7.781 3.22z" fill="#5d9cec"/><path d="m32 11v10c-3.03 0-5.78 1.229-7.77 3.22h-.01l-7.069-7.07c3.799-3.8 9.059-6.15 14.849-6.15z" fill="#ed5565"/><path d="m17.15 46.85-7.07 7.07c-5.61-5.61-9.08-13.36-9.08-21.92h10c0 5.8 2.35 11.05 6.15 14.85z" fill="#967adc"/><path d="m43.01 32h9.99c0 5.8-2.35 11.05-6.15 14.85l-7.069-7.07c1.989-1.99 3.219-4.751 3.219-7.78z" fill="#a0d468"/><path d="m17.15 17.149 7.069 7.07c-1.989 1.991-3.219 4.741-3.219 7.781h-10c0-5.801 2.35-11.051 6.15-14.851z" fill="#ec87c0"/><path d="m24.22 39.779-7.069 7.07c-3.801-3.799-6.151-9.049-6.151-14.849h10c0 3.029 1.23 5.79 3.22 7.779z" fill="#ac92ec"/><path d="m10.08 10.08 7.07 7.069c-3.8 3.8-6.15 9.05-6.15 14.851h-10c0-8.561 3.47-16.311 9.08-21.92z" fill="#d770ad"/><path d="m46.85 17.149-7.069 7.07c-1.991-1.99-4.741-3.219-7.781-3.219v-10c5.8 0 11.05 2.35 14.85 6.149z" fill="#fc6e51"/><path d="m32 1v10c-5.79 0-11.05 2.35-14.85 6.149l-7.07-7.069c5.61-5.61 13.36-9.08 21.92-9.08z" fill="#da4453"/></svg>
            </div>
            <div className="color_picker_theme">
                <CirclePicker
                    color={color}
                    onChangeComplete= { (color) => {handleClick(color.hex)} }
                />
                <button onClick={onSubmit} style={{backgroundColor: color}}>Save Color</button>
            </div>
        </div>
        
        

       
    )
};

export default Theme;