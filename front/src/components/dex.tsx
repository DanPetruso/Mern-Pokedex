import { useEffect, useState } from 'react'
import { Pokemon, PokemonProps } from './pokemon'
import Axios from "axios"

type AppProps = {
    typeFilter: string
    sortingMethod: string
    dexRegion: string
}



export const Dex = ({typeFilter, sortingMethod, dexRegion} : AppProps) => {

  const [dexList, loadPokemon] = useState([]);

  useEffect(() => {

    Axios.get("http://localHost:3001/getPokemon").then((response) =>{
      loadPokemon(response.data)
    })

  }, [])

const rows: PokemonProps[] = []

/* 
  var s : string | undefined = JSON.stringify(dexList[63])

    if(typeof s === "string"){
        rows.push(parsePokemon(s))
    }
    else {
      console.log("getting data")
    }
*/


  dexList.forEach((currMon) =>{
    var s : string | undefined = JSON.stringify(currMon)

    if(typeof s === "string"){
        rows.push(parsePokemon(s))
    }
    else {
      console.log("getting data")
    }
  })
  

  //type filter
  const filteredRows = (typeFilter != "All" ? (rows.filter((currMon) => (currMon.type1 === typeFilter || currMon.type2 === typeFilter))) : rows)

  const sorted = rowSort(filteredRows, sortingMethod, +dexRegion)

  //region filter
  const region = sorted.filter((currMon) => currMon.regions[+dexRegion] > 0)

  const jsxRows =  region.map((currMon: PokemonProps) => 
  <Pokemon key={currMon.name} name={currMon.name} num={currMon.num} regions={currMon.regions} games={currMon.games} type1={currMon.type1}
      type2={currMon.type2} abilities={currMon.abilities} bst={currMon.bst} hp={currMon.hp} atk={currMon.atk}
      def={currMon.def} spatk={currMon.spatk} spdef={currMon.spdef} spd={currMon.spd} regionState={+dexRegion}/>
    )

  return (
    <div>{jsxRows}</div>
  )
}


function parsePokemon(s: string): PokemonProps {
  //console.log(s)

  const pokemon : PokemonProps = {
      name: parseName(s),
      num: parseNum(s, /\"National_No\":\d*/),
      games: "",
      type1: parseType1(s),
      type2: parseType2(s),
      abilities: parseAbility(s),
 

      bst: parseNum(s, /\"Total\":\d*/),
      hp: parseNum(s, /\"HP\":\d*/),
      atk: parseNum(s, /\"Attack\":\d*/),
      def: parseNum(s, /\"Defense\":\d*/),
      spatk: parseNum(s, /\"Sp Atk\":\d*/),
      spdef: parseNum(s, /\"Sp Def\":\d*/),
      spd: parseNum(s, /\"Speed\":\d*/),
      
      regions: [],
      regionState: 0
  }

  pokemon.regions = regionParse(s, pokemon.num)

  //console.log(pokemon.name)

  return pokemon
}


function rowSort(rows: PokemonProps[], method: string, region: number){
    if(method === "region"){
        return rows.sort((p1, p2) => {if(p1.regions[region] > p2.regions[region]) return 1; return -1;})
    } 
    
    if(method === "name") return rows.sort((p1, p2) => {if(p1.name > p2.name) return 1; return -1;})
    
    if(method === "bst") return rows.sort((p1, p2) => {if(p1.bst < p2.bst) return 1; return -1;})
    if(method === "hp") return rows.sort((p1, p2) => {if(p1.hp < p2.hp) return 1; return -1;})
    if(method === "atk") return rows.sort((p1, p2) => {if(p1.atk < p2.atk) return 1; return -1;})
    if(method === "def") return rows.sort((p1, p2) => {if(p1.def < p2.def) return 1; return -1;})
    if(method === "spatk") return rows.sort((p1, p2) => {if(p1.spatk < p2.spatk) return 1; return -1;})
    if(method === "spdef") return rows.sort((p1, p2) => {if(p1.spdef < p2.spdef) return 1; return -1;})
    if(method === "spd") return rows.sort((p1, p2) => {if(p1.spd < p2.spd) return 1; return -1;})
    
    return rows
}



function parseAbility(str : string){
  const re :RegExp = /"Abilities.*Local/
  const check = str.match(re)
  if(check){
    var s = check[0].substring(17, check[0].length-8).replace(' (hidden ability)', '').replace(/\d/g, '').replace(/\'/g, '').replace(/]/g, '')
    //console.log(s)
    return s
  }
  return "No Ability"
  
}

function parseNum(str : string, re : RegExp){
  const s = str.match(re)
  
  if(s){
    const num = s[0].match(/(\d)+/)
    //console.log(num)
    if(num) return +num[0]
  }

  return 0
}

function parseName(str : string){
  const re : RegExp = /Name":"[^/"]*/
  const s = str.match(re)
  if(s){
    const trim = s[0].replace(/Name":"/, "")
    //console.log(trim)
    if(trim) return trim
  }
  //console.log(s.substring(1, s.length-1))
  return ""

}

function parseType1(str : string){
  const re : RegExp = /Type_1":"[A-z]*/
  const s = str.match(re)
  if(s){
    const trim = s[0].replace(/Type_1":"/, "")
    //console.log(trim)
    if(trim) return trim
  }
  //console.log(s.substring(1, s.length-1))
  return ""

}

function parseType2(str : string){
  const re : RegExp = /Type_2":"[A-z]*/
  const s = str.match(re)
  if(s){
    const trim = s[0].replace(/Type_2":"/, "")
    //console.log(trim)
    if(trim) return trim
  }
  //console.log(s.substring(1, s.length-1))
  return ""

}




  function regionParse(str : string, num : number){
    // parse and sanitize games string and save number for each dex region 
    // 0001 (Red/Blue/Yellow)0226 (Gold/Silver/Crystal)0001 (FireRed/LeafGreen)0231 (HeartGold......
  
    const regArr : RegExp[] = [
      /\d{3}\s\(((Red|Blue|Yellow)\/(Red|Blue|Yellow)\/(Red|Blue|Yellow))/,
      /\d{3}\s\(((Gold|Silver|Crystal)\/(Gold|Silver|Crystal)\/(Gold|Silver|Crystal))/,
      /\d{3}\s\(((Ruby|Sapphire|Emerald)\/(Ruby|Sapphire|Emerald)\/(Ruby|Sapphire|Emerald))/,
      /\d{3}\s\(Platinum/,
      /\d{3}\s\(((Black\s2|White\s2)\/(Black\s2|White\s2))/,
      /\d{3}\s\(X\/Y[^/d]*/,
      /\d{3}\s\((Sun|Moon)\/((Sun|Moon))/,
      /\d{3}\s\((Sword|Shield)\/((Sword|Shield))/,
      /\d{3}\s\((Scarlet|Violet)\/((Scarlet|Violet))/,
      /\d{3}\s\(Legends/
    ];

    const regCoast : RegExp = /Coastal/
    const regMt : RegExp = /Mountain/
  
    const arr : number[] = [num]

    for (let i = 0; i < regArr.length; i++) {
      const check = str.match(regArr[i])

      if(check){
        if(i == 5){
          if(check[0].match(regCoast)) arr.push(+(check[0].substring(0,3)) + 154)
          if(check[0].match(regMt)) arr.push(+(check[0].substring(0,3)) + 154 + 153)
        } else{
      arr.push(+(check[0].substring(0,3)))
      }
        

      } else {
        arr.push(-1)
      }
      
    }
  
    //console.log(arr)
  
    return arr
  
  }
