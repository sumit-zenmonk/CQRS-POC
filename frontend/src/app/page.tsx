'use client'

import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts"
import { Box, Typography, } from "@mui/material"
import { RootState } from "@/redux/store";
import styles from "./home.module.css";
import HeaderComp from "@/component/header-comp/header-comp";
import { useEffect } from "react";
import { fetchProducts } from "@/redux/feature/products/products-action";

export default function Home() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.userReducer);
  const { products } = useAppSelector((state: RootState) => state.productsReducer);

  useEffect(() => {
    dispatch(fetchProducts({ page: 0 })).unwrap();
  }, []);


  return (
    <Box className={styles.container}>
      <Box className={styles.headerBox}>
        <HeaderComp />
      </Box>

      <Box>
        <Typography>Name - {user?.username}</Typography>
        <Typography>Email - {user?.email}</Typography>
      </Box>
    </Box>
  )
}