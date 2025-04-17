import ImgUpload from './ImgUpload/ImgUpload'
import InfoInput from './InfoInput/InfoInput'

const MyItem = () => {
  return (
    <div className="my-item-shop">
      <span className="my-item">내 쇼핑몰</span>
      <div className="item-content">
        <ImgUpload />
        <InfoInput />
      </div>
    </div>
  )
}

export default MyItem
