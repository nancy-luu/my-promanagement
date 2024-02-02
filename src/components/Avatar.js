
// styles
import './Avatar.css'

export default function Avatar({ src }) {

  console.log("inside avatar")
  console.log(src)

  return (
    <div className="avatar">
        <img src={src} alt={`avatar ${src}`}/>
    </div>
  )
}
