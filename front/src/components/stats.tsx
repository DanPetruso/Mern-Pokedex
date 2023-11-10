type StatsProps = {
    bst: number,
    hp: number,
    atk: number,
    def: number,
    spatk: number,
    spdef: number,
    spd: number
}

const Stats = ({ bst, hp, atk, def, spatk, spdef, spd }: StatsProps) => {

  return (
    <table id="stats">
      <tbody>
        <tr>
            <td id="bst">{bst}</td>
            <td id="hp">{hp}</td>
            <td id="atk">{atk}</td>
            <td id="def">{def}</td>
            <td id="spatk">{spatk}</td>
            <td id="spdef">{spdef}</td>
            <td id="spd">{spd}</td>
        </tr>
      </tbody>
    </table>
  )
}


export default Stats