import { useEffect, useState } from "react";
import {
  ExtraActionsWrapper,
  Product,
  ProductActionButton,
  ProductActionsWrapper,
  ProductAddToCart,
  ProductFavButton,
  ProductImage,
  ProductMetaWrapper,
} from "../../styles/product";
import { Stack, Tooltip, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import FitScreenIcon from "@mui/icons-material/FitScreen";
import useDialogModal from "../../hooks/useDialogModal";
import ProductDetail from "../productdetail";
import ProductMeta from "./ProductMeta";
import useCart from "../../hooks/useCart";
import {products} from "../../data";

export default function SingleProductDesktop({ product, matches }) {
  const [showOptions, setShowOptions] = useState(false);
  const [ProductDetailDialog,
        showProductDetailDialog,
        closeProductDialog] =useDialogModal(ProductDetail);

  
  const {addToCart, addToCartText} = useCart(product);


  const handleMouseEnter = () => {
    setShowOptions(true);
  };
  const handleMouseLeave = () => {
    setShowOptions(false);
  };

  return (
    <>
    <Product onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <ProductImage src={product.image} />
        <ProductFavButton isFav={0}>
            <FavoriteIcon />
        </ProductFavButton>
        {showOptions && (
            <ProductAddToCart
                onClick={addToCart}
                show={showOptions}
                variant="contained"
            >
                {addToCartText}
            </ProductAddToCart>
        )}
        <ProductActionsWrapper show={showOptions}>
            <Stack direction="column">
                <ProductActionButton>
                    <ShareIcon color="primary" />
                </ProductActionButton>
                <ProductActionButton onClick={() => showProductDetailDialog()}>
                    <FitScreenIcon color="primary" />
                </ProductActionButton>
            </Stack>
        </ProductActionsWrapper>
    </Product>
    <ProductMeta product={product} matches={matches} />
    <ProductDetailDialog product={product} />
</>
);
}

