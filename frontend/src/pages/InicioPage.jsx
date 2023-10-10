import React from "react";


function InicioPage() {

  return (
    <div className="bg-slate-500 p-8">
      <div id="navbar">
      </div>
      <div id="contenido" className="">
        <div className="text-3xl font-bold mb-4">Hello</div>

        <img className="w-full mb-4" src="" alt="" />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2"
          id="btn1"
          onClick={print}
        >
          Girar
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4"
          id="btn2"
        >
          Capturar
        </button>
      </div>
    </div>
  );
}

export default InicioPage;
