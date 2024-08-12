import { PencilIcon, TrashIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header/header";

interface Products {
  id?: number;
  name: string;
  description: string;
  price: string;
  stock: string;
}

export const Products = () => {
  const [token, setToken] = useState<string | null>(null);
  const [registerProducts, setRegisterProducts] = useState<
    Omit<Products, "id">
  >({
    name: "",
    description: "",
    price: "",
    stock: "",
  });
  const [renderProducts, setRenderProducts] = useState<Products[]>([]);
  const [productSearched, setProductsSearched] = useState<string>("");
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [editingProductData, setEditingProductData] = useState<
    Omit<Products, "id">
  >({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const baseUrl = "https://interview.t-alpha.com.br/api/";

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      listProducts();
    }
  }, [token]);

  const onClickProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    const apiRequest = `${baseUrl}products/create-product`;
    await fetch(apiRequest, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: registerProducts.name,
        description: registerProducts.description,
        price: Number(registerProducts.price),
        stock: Number(registerProducts.stock),
      }),
    });

    setRegisterProducts({
      name: "",
      description: "",
      price: "",
      stock: "",
    });

    // Recarrega a lista de produtos
    listProducts();
  };

  const listProducts = async () => {
    const apiRequest = `${baseUrl}products/get-all-products`;
    const response = await fetch(apiRequest, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setRenderProducts(data.data.products);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterProducts((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.value;
    setProductsSearched(id);

    if (id) {
      const product = await searchProductById(id);
      if (product) {
        setRenderProducts([product]);
      } else {
        setRenderProducts([]);
      }
    } else {
      listProducts();
    }
  };

  const searchProductById = async (id: string) => {
    const apiRequest = `${baseUrl}products/get-one-product/${id}`;
    const response = await fetch(apiRequest, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.data.product;
    } else {
      console.error("Product not found");
      return null;
    }
  };

  const startEditingProduct = (product: Products) => {
    setEditingProductId(product.id || null);
    setEditingProductData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveEditedProduct = async (e: React.FormEvent, id: number) => {
    e.preventDefault();
    const apiRequest = `${baseUrl}products/update-product/${id}`;
    await fetch(apiRequest, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: editingProductData.name,
        description: editingProductData.description,
        price: Number(editingProductData.price),
        stock: Number(editingProductData.stock),
      }),
    });

    // Sai do modo de edição
    setEditingProductId(null);

    // Recarrega a lista de produtos
    listProducts();
  };

  const deleteProductById = async (id: number) => {
    const apiRequest = `${baseUrl}products/delete-product/${id}`;
    await fetch(apiRequest, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Recarrega a lista de produtos
    listProducts();
  };

  return (
    <div className='bg-gray-950 text-white h-full w-screen overflow-auto pb-16'>
      <Header />

      <form
        action=''
        method='post'>
        <fieldset className='border-white border m-auto w-[calc(100%-1rem)] sm:w-full flex flex-col items-start gap-5 py-10 p-2 rounded-md  max-w-lg sm:items-center'>
          <legend className='ml-4'>Cadastrar produtos</legend>

          <div className='flex flex-col gap-1 w-full max-w-xs'>
            <label htmlFor='inputProductName'>Name: </label>
            <input
              className='border border-white bg-transparent'
              type='text'
              name='name'
              id='inputProductName'
              value={registerProducts.name}
              onChange={handleChange}
            />
          </div>

          <div className='flex flex-col gap-1 w-full max-w-xs'>
            <label htmlFor='inputDescription'>Description: </label>
            <input
              className='border border-white bg-transparent'
              type='text'
              name='description'
              id='inputDescription'
              value={registerProducts.description}
              onChange={handleChange}
            />
          </div>

          <div className='flex flex-col gap-1 w-full max-w-xs'>
            <label htmlFor='inputPrice'>Price: </label>
            <input
              className='border border-white bg-transparent'
              type='number'
              name='price'
              id='inputPrice'
              value={registerProducts.price}
              onChange={handleChange}
            />
          </div>

          <div className='flex flex-col gap-1 w-full max-w-xs'>
            <label htmlFor='inputStock'>Stock: </label>
            <input
              className='border border-white bg-transparent'
              type='number'
              name='stock'
              id='inputStock'
              value={registerProducts.stock}
              onChange={handleChange}
            />
          </div>

          <button
            type='submit'
            onClick={onClickProduct}
            className='bg-slate-500 rounded-sm p-1 w-full max-w-xs hover:bg-slate-700 duration-100'>
            Cadastrar
          </button>
        </fieldset>
      </form>

      <section className='m-4 mt-10 sm:m-auto sm:mt-10 p-4 flex flex-col gap-5 border-white border w-[calc(100%-1rem)] sm:w-full items-start py-10 rounded-md max-w-lg sm:items-center'>
        <section>
          <input
            type='text'
            value={productSearched}
            placeholder='Buscar produto por ID'
            onChange={handleChangeSearch}
            className='border border-white bg-transparent '
          />
        </section>

        <section className='flex flex-col gap-4'>
          {renderProducts.length > 0 ? (
            renderProducts.map((product) => (
              <div
                className='border border-white flex flex-col gap-2 rounded-lg max-w-xs p-2 relative'
                key={product.id}>
                {editingProductId === product.id ? (
                  <>
                    <input
                      type='text'
                      name='name'
                      value={editingProductData.name}
                      onChange={handleEditChange}
                      className='border border-white bg-transparent'
                    />
                    <input
                      type='text'
                      name='description'
                      value={editingProductData.description}
                      onChange={handleEditChange}
                      className='border border-white bg-transparent'
                    />
                    <input
                      type='number'
                      name='price'
                      value={editingProductData.price}
                      onChange={handleEditChange}
                      className='border border-white bg-transparent'
                    />
                    <input
                      type='number'
                      name='stock'
                      value={editingProductData.stock}
                      onChange={handleEditChange}
                      className='border border-white bg-transparent'
                    />
                    <button
                      onClick={(e) => saveEditedProduct(e, product.id!)}
                      className='bg-green-500 text-white rounded p-1'>
                      Enviar
                    </button>
                  </>
                ) : (
                  <>
                    <h2>Name: {product.name}</h2>
                    <p>Description: {product.description}</p>
                    <p>Price: {product.price}</p>
                    <p>Stock: {product.stock}</p>

                    <div className='flex gap-4 absolute top-0 right-0'>
                      <button onClick={() => startEditingProduct(product)}>
                        <PencilIcon size={20} />
                      </button>

                      <button onClick={() => deleteProductById(product.id!)}>
                        <TrashIcon size={20} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
        </section>
      </section>
    </div>
  );
};
