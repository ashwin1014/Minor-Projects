import { useState } from 'react';
import { useQuery } from 'react-query';

import { Drawer, LinearProgress, Grid, Badge } from '@material-ui/core';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';

import Item from './Item/Item';
import Cart from './Cart/Cart';

import { Wrapper, StyledButton } from './App.styles';

export type CartItemType = {
  id: number,
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number
};

const getProducts = async (): Promise<CartItemType[]> => {
  return await (await fetch('https://fakestoreapi.com/products')).json();
}

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[])

  const drawerHandler = () => setCartOpen(prev => !prev);

  const { data, isLoading, error } = useQuery<CartItemType[]>('Products', getProducts);
  console.log(data)

  const getTotalItems = (items: CartItemType[]) => (
    items.reduce((ack: number, item) => ack + item.amount, 0)
  );

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      const itemInCart = prev.find(item => item.id === clickedItem.id);
      if (itemInCart) {
        return prev.map(item => (
          item.id === clickedItem.id ? { ...item, amount: item.amount + 1 } : item
        ))
      }
      return [...prev, { ...clickedItem, amount: 1 }]
    })
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading) {
    return <LinearProgress />;
  }

  if (error) {
    return <small>Something went wrong..</small>
  }

  return (
    <Wrapper>
      <Drawer open={cartOpen} anchor='right' onClose={drawerHandler}>
        <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} />
      </Drawer>
      <StyledButton onClick={drawerHandler}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCart />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {
          data?.map((item) => (
            <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddToCart} />
            </Grid>
          ))
        }
      </Grid>
    </Wrapper>
  )
}

export default App;
