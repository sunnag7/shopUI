/**
* This is the Home page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Content, View, Button, Left, Right, Icon, Card, CardItem, cardBody } from 'native-base';
import { Actions } from 'react-native-router-flux';

// Our custom files and classes import
import Text from '../component/Text';
import Navbar from '../component/Navbar';
import SideMenu from '../component/SideMenu';
import SideMenuDrawer from '../component/SideMenuDrawer';
import CategoryBlock from '../component/CategoryBlock';

export default class Home extends Component {
  render() {
    var left = (
      <Left style={{flex:1}}>
        <Button onPress={() => this._sideMenuDrawer.open()} transparent>
          <Icon name='ios-menu-outline' />
        </Button>
      </Left>
    );
    var right = (
      <Right style={{flex:1}}>
        <Button onPress={() => Actions.search()} transparent>
          <Icon name='ios-search-outline' />
        </Button>
        <Button onPress={() => Actions.cart()} transparent>
          <Icon name='ios-cart' />
        </Button>
      </Right>
    );
    return(
      <SideMenuDrawer ref={(ref) => this._sideMenuDrawer = ref}>
          <Container>
            <Navbar left={left} right={right} title="ABS STORE" />
            <Content>
              {this.renderCategories()}
            </Content>
          </Container>
      </SideMenuDrawer>
    );
  }


  renderCategories() {
    let cat = [];
    for(var i=0; i<categories.length; i++) {
      cat.push(
        <CategoryBlock key={categories[i].id} id={categories[i].id} image={categories[i].image} title={categories[i].title} />
      );
    }
    return cat;
  }

}

var categories = [
  {
    id: 1,
    title: 'FEATURED PRODUCTS', 
    image: 'http://cdn.cnetcontent.com/2c/69/2c69e400-be73-4334-b521-b6c618d770fa.jpg'
  },
  {
    id: 2,
    title: 'PH2 ITEMS',
    image: 'http://cdn.cnetcontent.com/07/63/0763a146-f2f0-42db-89e3-dafea5c184e5.jpg'
  },
  {
    id: 3,
    title: 'LATEST PRODUCTS',
    image: 'http://cdn.cnetcontent.com/fa/20/fa20d6db-7220-47cc-b555-42b9f60b6ba9.jpg'
  },
  {
    id: 4,
    title: 'BEST SELLER',
    image: 'https://cdn.cnetcontent.com/19/bc/19bc3498-20ed-444a-a904-5d2854e5e079.jpg'
  }
];
