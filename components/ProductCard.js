import styles from '../styles/PLP.module.css';

const ProductCard = ({ product }) => (
  <div className={styles.productCard}>
    <div className={styles.imageContainer}>
    <img src={product.image} alt={product.title} className={styles.productImage} />
    </div>
    <h2 className={styles.productTitle}>{product.title}</h2>
    <p className={styles.productPrice}>${product.price}</p>
  </div>
);

export default ProductCard;
