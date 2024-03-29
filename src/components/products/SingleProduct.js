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
import {products} from "../../data";

export default function SingleProduct({ product, matches }) {
  const [ProductDetailDialog, showProductDetailDialog, closeProductDialog] =
    useDialogModal(ProductDetail);

  const [showOptions, setShowOptions] = useState(false);

  const handleMouseEnter = () => {
    setShowOptions(true);
  };
  const handleMouseLeave = () => {
    setShowOptions(false);
  };


  return (
    <>
        <Product>
            <ProductImage src={product.image} />
            <ProductMeta product={product} matches={matches} />
            <ProductActionsWrapper>
                <Stack direction="row">
                    <ProductFavButton isFav={0}>
                        <FavoriteIcon />
                    </ProductFavButton>
                    <ProductActionButton>
                        <ShareIcon color="primary" />
                    </ProductActionButton>
                    <ProductActionButton onClick={() => showProductDetailDialog()}>
                        <FitScreenIcon color="primary" />
                    </ProductActionButton>
                </Stack>
            </ProductActionsWrapper>
        </Product>
        <ProductAddToCart variant="contained">Add to cart</ProductAddToCart>
        <ProductDetailDialog product={product} />
    </>
);
}
  

