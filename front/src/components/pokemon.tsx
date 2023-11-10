import Stats from './stats'
import './pokemon.css'

export type PokemonProps = {
    name: string,
    num: number,
    games: string,
    regions: number[],
    regionState: number,

    type1: string,
    type2: string,

    abilities: string,

    bst: number,
    hp: number,
    atk: number,
    def: number,
    spatk: number,
    spdef: number,
    spd: number

    }

export const Pokemon = ({name, num, type1, type2, abilities, bst, hp, atk, def, spatk, spdef, spd, regions, regionState } : PokemonProps) => {

  const image = "https://www.serebii.net/pokedex-sv/icon/new/" + padZero(num) + ".png"

  return (
    <table id="pokemon">
      <tbody>
        <tr>
            <td id="num">{regions[regionState]}</td>
            <td><img src={image} height={50} width={50}/></td>
            <td id="name">{name}</td>

            <td id="type1"> <img src={typeImage(type1)} height={20} width={50}/></td>
            <td id="type2"> <img src={typeImage(type2)} height={20} width={50}/></td>
            
            <td id="ability">{abilities}</td>
            <td><Stats bst={bst} hp={hp} atk={atk} def={def} spatk={spatk} spdef={spdef} spd={spd} /></td>
        </tr>
      </tbody>
    </table>
    
  )
}




function padZero(num : number) {
  let s = num+"";
  while (s.length < 3) s = "0" + s;
  return s;
}


function typeImage(type : string){
  if(type === "None") return ""
  return "https://serebii.net/pokedex-bw/type/" + type.toLowerCase() + ".gif"
}






