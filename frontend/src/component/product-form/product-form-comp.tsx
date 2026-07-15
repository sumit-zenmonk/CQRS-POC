"use client";

import styles from "./product-form.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, InputLabel, Modal, TextField } from "@mui/material";
import { useAppDispatch } from "@/redux/hooks.ts";
import { enqueueSnackbar } from "notistack";
import { createProductSchema, CreateProductSchemaType } from "@/schemas/product";
import { CreateProductPayload } from "@/redux/feature/products/products-type";
import { createProduct, fetchProducts } from "@/redux/feature/products/products-action";

interface ProductFormModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ProductFormModalComp({ isOpen, onClose }: ProductFormModalProps) {
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<CreateProductSchemaType>({
        resolver: zodResolver(createProductSchema),
    })

    const onSubmit = async (data: CreateProductPayload) => {
        try {
            await dispatch(createProduct(data)).unwrap()
            dispatch(fetchProducts({ page: 1 })).unwrap();
            reset();
            onClose();
        } catch (error) {
            enqueueSnackbar(String(error || "Something wrong"), { variant: "error" });
            console.log(error)
        }
    }

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box className={styles.modalContainer}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <Box className={styles.field}>
                        <InputLabel htmlFor={`name-input`} className={styles.label}>Name</InputLabel>

                        <TextField
                            id={`name-input`}
                            type="text"
                            placeholder="wedding product"
                            fullWidth
                            {...register("name")}
                            variant="standard"
                        />
                        {errors.name && (
                            <span className={styles.error}>
                                {errors.name.message}
                            </span>
                        )}
                    </Box>

                    <Box className={styles.field}>
                        <InputLabel htmlFor={`description-input`} className={styles.label}>Description</InputLabel>

                        <TextField
                            id={`description-input`}
                            type="text"
                            multiline
                            placeholder="wedding product is wonderful at location organized by somewhere and by whom and some related description...."
                            fullWidth
                            {...register("description")}
                            variant="standard"
                        />
                        {errors.description && (
                            <span className={styles.error}>
                                {errors.description.message}
                            </span>
                        )}
                    </Box>

                    <Box className={styles.field}>
                        <InputLabel htmlFor={`price-input`} className={styles.label}>Price</InputLabel>

                        <TextField
                            id={`price-input`}
                            type="number"
                            placeholder="wedding product is wonderful at location organized by somewhere and by whom and some related description...."
                            fullWidth
                            {...register("price", { valueAsNumber: true })}
                            variant="standard"
                        />
                        {errors.price && (
                            <span className={styles.error}>
                                {errors.price.message}
                            </span>
                        )}
                    </Box>

                    <Button
                        type="submit"
                        className={styles.button}
                    >
                        Create Product
                    </Button>
                </form>

            </Box>
        </Modal>
    );
}