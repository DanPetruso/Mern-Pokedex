import './App.css'
import { Dex } from './components/dex'
import React from 'react';


const App = () => {

  const [typeFilt, setType] = React.useState("All");
  const [order, setOrder] = React.useState("region");
  const [dex, setDex] = React.useState("0");
  
  function filterSet(){
    const t = document.getElementById("dropdownType") as HTMLSelectElement;
    setType(t.value)
  }

  function orderSet(){
    const o = document.getElementById("dropdownOrder") as HTMLSelectElement;
    setOrder(o.value)
  }

  function dexSet(){
    const d = document.getElementById("dropdownDex") as HTMLSelectElement;
    setDex(d.value)
  }


  return (


    <div id="main"> 
      <img id="title" src={"https://i.pinimg.com/originals/bd/cd/20/bdcd20f5411ee5785889542d303ad4cb.png"} height={150} width={700}/>

      <table id="header" className='header'>
            <thead> 
          <tr> 
              <td>
              <select id="dropdownDex" className="drop" onChange={dexSet}>
                <option value="0">National Dex</option>
                <option value="1">Kanto</option>
                <option value="2">Johto</option>
                <option value="3">Hoenn</option>
                <option value="4">Sinnoh</option>
                <option value="5">Unova</option>
                <option value="6">Kalos</option>
                <option value="7">Alola</option>
                <option value="8">Galar</option>
                <option value="9">Paldea</option>
                <option value="10">Hisui</option>
              </select>
              </td>

              <td>
                <select id="dropdownOrder" className="drop" onChange={orderSet}>
                <option value="region">Dex Order</option>
                <option value="name">Alphabetical</option>
                <option value="bst">Base Stat Total</option>
                <option value="hp">HP</option>
                <option value="atk">Attack</option>
                <option value="def">Defense</option>
                <option value="spatk">Sp.Attack</option>
                <option value="spdef">Sp.Defense</option>
                <option value="spd">Speed</option>
              </select>
              </td>


              <td>
                <select id="dropdownType" className="drop" onChange={filterSet}>
                <option value="All">Types</option>
                <option value="Electric">Electric</option>
                <option value="Water">Water</option>
                <option value="Fire">Fire</option>
                <option value="Grass">Grass</option>
                <option value="Normal">Normal</option>
                <option value="Flying">Flying</option>
                <option value="Rock">Rock</option>
                <option value="Ground">Ground</option>
                <option value="Bug">Bug</option>
                <option value="Fairy">Fairy</option>
                <option value="Steel">Steel</option>
                <option value="Psychic">Psychic</option>
                <option value="Dragon">Dragon</option>
                <option value="Dark">Dark</option>
                <option value="Ghost">Ghost</option>
                <option value="Fighting">Fighting</option>
                <option value="Ice">Ice</option>
                <option value="Poison">Poison</option>
              </select>
              </td>



              <td id="ability">Abilities</td>

      <table id="stats">
      <tbody>
        <tr>
            <td id="bst">BST</td>
            <td id="hp">HP</td>
            <td id="atk">Atk</td>
            <td id="def">Def</td>
            <td id="spatk">SpAtk</td>
            <td id="spdef">SpDef</td>
            <td id="spd">Spd</td>
        </tr>
      </tbody>
    </table>


              

          </tr>
          </thead>
          </table>

          <Dex typeFilter={typeFilt} sortingMethod={order} dexRegion={dex}/>

      </div>


  )
}



export default App