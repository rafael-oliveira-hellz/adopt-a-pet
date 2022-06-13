import styles from './RoundedImageFrame.module.css';

const RoundedImageFrame = ({ src, alt, width }) => {
    return (
        <img className={`${styles.rounded_image} ${styles[width]}`} 
        src={src} 
        alt={alt} 
        />
    )
}
    
export default RoundedImageFrame;