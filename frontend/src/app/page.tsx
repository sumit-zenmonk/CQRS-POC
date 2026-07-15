'use client'

import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts"
import { Box, Button, CircularProgress, Typography, } from "@mui/material"
import { RootState } from "@/redux/store";
import styles from "./home.module.css";
import HeaderComp from "@/component/header-comp/header-comp";
import { useEffect, useState } from "react";
import { deleteProduct, fetchProducts } from "@/redux/feature/products/products-action";
import InfiniteScroll from "react-infinite-scroll-component";
import { ProductType } from "@/redux/feature/products/products-type";
import { enqueueSnackbar } from "notistack";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ProductFormModalComp from "@/component/product-form/product-form-comp";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

export default function Home() {
  const dispatch = useAppDispatch();
  const { products, totalProductDocuments, page } = useAppSelector((state: RootState) => state.productsReducer);
  const [openCreateProductModal, setOpenCreateProductModal] = useState(false);
  const DEFAULT_PAGE = Number(process.env.NEXT_PUBLIC_DEFAULT_PAGE) || 1;

  useEffect(() => {
    dispatch(fetchProducts({ page: DEFAULT_PAGE })).unwrap();
  }, []);

  const fetchProductsListing = async () => {
    try {
      if (products.length >= totalProductDocuments) return;

      const nextPage = page + 1;
      await dispatch(fetchProducts({ page: nextPage })).unwrap();
    } catch (error: any) {
      enqueueSnackbar(error, { variant: "error" });
      console.log(error);
    }
  };

  const handleProductDelete = async (product_uuid: string) => {
    try {
      await dispatch(deleteProduct({ product_uuid })).unwrap();
    } catch (error: any) {
      enqueueSnackbar(error, { variant: "error" });
      console.log(error);
    }
  }

  const handleProductModalToggle = (toggle: boolean) => {
    setOpenCreateProductModal(toggle);
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.headerBox}>
        <HeaderComp />

        <Box className={styles.headerButtonBox}>
          <Button
            className={styles.headerButton}
            startIcon={<AddOutlinedIcon />}
            onClick={() => handleProductModalToggle(true)}
          >
            Create Product
          </Button>
        </Box>
      </Box>

      <Box id="scrollableDiv" className={styles.scrollWrapper}>
        <InfiniteScroll
          dataLength={products?.length || 0}
          next={fetchProductsListing}
          hasMore={products?.length < totalProductDocuments}
          loader={<Box className={styles.loader}><CircularProgress size={30} /></Box>}
          endMessage={<Typography className={styles.endMessage}>Yay! You have seen it all</Typography>}
          scrollableTarget="scrollableDiv"
        >
          <Box className={styles.productWrapper}>
            {products.length ? products.map((product: ProductType, idx: number) => {
              if (!product) return;

              return (
                <Box
                  key={idx}
                  className={styles.card}
                >
                  {product.name}
                  {product.description}
                  {product.price}

                  <Button
                    startIcon={<DeleteOutlinedIcon />}
                    className={styles.footerButton}
                    onClick={async () => await handleProductDelete(product.uuid)}
                  >
                    Delete
                  </Button>
                </Box>
              )
            }) : <></>}
          </Box>
        </InfiniteScroll>
      </Box >

      <ProductFormModalComp isOpen={openCreateProductModal} onClose={() => handleProductModalToggle(false)} />
    </Box>
  )
}