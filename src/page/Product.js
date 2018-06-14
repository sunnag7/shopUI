/**
* This is the Main file
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Image, Dimensions, TouchableWithoutFeedback, AsyncStorage } from 'react-native';
import { View, Container, Content, Button, Left, Right, Icon, Picker, Item, Grid, Col, Toast, Text as NBText } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Carousel, { Pagination } from 'react-native-snap-carousel';

// Our custom files and classes import
import Colors from '../Colors';
import Text from '../component/Text';
import Navbar from '../component/Navbar';
import {default as ProductComponent} from '../component/Product';

export default class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: {},
      activeSlide: 0,
      quantity: 1,
      selectedColor: '',
      selectedSize: ''
    };
  }

  componentWillMount() {
    //get the product with id of this.props.product.id from your server
    this.setState({product: dummyProduct});
  }

  componentDidMount() {
    /* Select the default color and size (first ones) */
    let defColor = this.state.product.colors[0];
    let defSize = this.state.product.sizes[0];
    this.setState({
      selectedColor: defColor,
      selectedSize: defSize
    });
  }

  render() {
    var left = (
      <Left style={{flex:1}}>
        <Button onPress={() => Actions.pop()} transparent>
          <Icon name='ios-arrow-back' />
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
      <Container style={{backgroundColor: '#fdfdfd'}}>
        <Navbar left={left} right={right} title={this.props.product.title} />
        <Content>
          <Carousel
              ref={(carousel) => { this._carousel = carousel; }}
              sliderWidth={Dimensions.get('window').width}
              itemWidth={Dimensions.get('window').width}
              onSnapToItem={(index) => this.setState({ activeSlide: index }) }
              enableSnap={true}
            >
                {this.renderImages()}
            </Carousel>
            <Pagination
              dotsLength={this.state.product.images.length}
              activeDotIndex={this.state.activeSlide}
              containerStyle={{ backgroundColor: 'transparent',paddingTop: 0, paddingBottom: 0, marginTop: -15 }}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.92)'
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
          <View style={{backgroundColor: '#fdfdfd', paddingTop: 10, paddingBottom: 10, paddingLeft: 12, paddingRight: 12, alignItems: 'center'}}>
            <Grid>
              <Col size={3}>
                <Text style={{fontSize: 18}}>{this.state.product.title}</Text>
              </Col>
              <Col>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{this.state.product.price}</Text>
              </Col>
            </Grid>
            <Grid style={{marginTop: 15}}>
              <Col>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text>Color:</Text>
                </View>
              </Col>
              <Col size={3}>
                <Picker
                  mode="dropdown"
                  placeholder="Select a color"
                  note={true}
                  selectedValue={this.state.selectedColor}
                  onValueChange={(color) => this.setState({selectedColor: color})}
                >
                  {this.renderColors()}
                </Picker>
              </Col>
            </Grid>
            <Grid>
              <Col>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text>Size:</Text>
                </View>
              </Col>
              <Col size={3}>
                <Picker
                  mode="dropdown"
                  placeholder="Select a size"
                  note={true}
                  selectedValue={this.state.selectedSize}
                  onValueChange={(size) => this.setState({selectedSize: size})}
                >
                  {this.renderSize()}
                </Picker>
              </Col>
            </Grid>
            <Grid>
              <Col>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text>Quantity:</Text>
                </View>
              </Col>
              <Col size={3}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Button style={{flex: 1}} icon light onPress={() => this.setState({quantity: this.state.quantity>1 ? this.state.quantity-1 : 1})} >
                    <Icon name='ios-remove-outline' />
                  </Button>
                  <View style={{flex: 4, justifyContent: 'center', alignItems: 'center', paddingLeft: 30, paddingRight: 30}}>
                    <Text style={{fontSize: 18}}>{this.state.quantity}</Text>
                  </View>
                  <Button style={{flex: 1}} icon light onPress={() => this.setState({quantity: this.state.quantity+1})}>
                    <Icon name='ios-add' />
                  </Button>
                </View>
              </Col>
            </Grid>
            <Grid style={{marginTop: 15}}>
              <Col size={3}>
                <Button block onPress={this.addToCart.bind(this)} style={{backgroundColor: Colors.navbarBackgroundColor}}>
                  <Text style={{color: "#fdfdfd", marginLeft: 5}}>Add to cart</Text>
                </Button>
              </Col>
              <Col>
              <Button block onPress={this.addToWishlist.bind(this)} icon transparent style={{backgroundColor: '#fdfdfd'}}>
                <Icon style={{color: Colors.navbarBackgroundColor}} name='ios-heart' />
              </Button>
              </Col>
            </Grid>
            <View style={{marginTop: 15, padding: 10, borderWidth: 1, borderRadius: 3, borderColor: 'rgba(149, 165, 166, 0.3)'}}>
              <Text style={{marginBottom: 5}}>Description</Text>
              <View style={{width: 50, height: 1, backgroundColor: 'rgba(44, 62, 80, 0.5)', marginLeft: 7, marginBottom: 10}} />
              <NBText note>
                {this.state.product.description}
              </NBText>
            </View>
          </View>
          <View style={{marginTop: 15, paddingLeft: 12, paddingRight: 12}}>
            <Text style={{marginBottom: 5}}>Similar items</Text>
            <View style={{width: 50, height: 1, backgroundColor: 'rgba(44, 62, 80, 0.5)', marginLeft: 7, marginBottom: 10}} />
            {this.renderSimilairs()}
          </View>
        </Content>
      </Container>
    );
  }

  renderImages() {
    let images = [];
    this.state.product.images.map((img, i) => {
      images.push(
          <TouchableWithoutFeedback
            key={i}
            onPress={() => this.openGallery(i)}
          >
            <Image
              source={{uri: img}}
              style={{width: Dimensions.get('window').width, height: 350}}
              resizeMode="cover"
            />
          </TouchableWithoutFeedback>
      );
    });
    return images;
  }

  renderColors() {
    let colors = [];
    this.state.product.colors.map((color, i) => {
      colors.push(
        <Item key={i} label={color} value={color} />
      );
    });
    return colors;
  }

  renderSize() {
    let size = [];
    this.state.product.sizes.map((s, i) => {
      size.push(
        <Item key={i} label={s} value={s} />
      );
    });
    return size;
  }

  renderSimilairs() {
    let items = [];
    let stateItems = this.state.product.similarItems;
    for(var i=0; i<stateItems.length; i+=2 ) {
      if(stateItems[i+1]) {
        items.push(
          <Grid key={i}>
            <ProductComponent key={stateItems[i].id} product={stateItems[i]} />
            <ProductComponent key={stateItems[i+1].id} product={stateItems[i+1]} isRight />
          </Grid>
        );
      }
      else {
        items.push(
          <Grid key={i}>
            <ProductComponent key={stateItems[i].id} product={stateItems[i]} />
            <Col key={i+1} />
          </Grid>
        );
      }
    }
    return items;
  }

  openGallery(pos) {
    Actions.imageGallery({images: this.state.product.images, position: pos});
  }

  addToCart() {
    var product = this.state.product;
    product['color'] = this.state.selectedColor;
    product['size'] = this.state.selectedSize;
    product['quantity'] = this.state.quantity;
    AsyncStorage.getItem("CART", (err, res) => {
      if(!res) AsyncStorage.setItem("CART",JSON.stringify([product]));
      else {
        var items = JSON.parse(res);
        items.push(product);
        AsyncStorage.setItem("CART",JSON.stringify(items));
      }
      Toast.show({
        text: 'Product added to your cart !',
        position: 'bottom',
        type: 'success',
        buttonText: 'Dismiss',
        duration: 3000
      });
    });
  }

  addToWishlist() {
    var product = this.state.product;
    var success = true;
    AsyncStorage.getItem("WISHLIST", (err, res) => {
      if(!res) AsyncStorage.setItem("WISHLIST",JSON.stringify([product]));
      else {
        var items = JSON.parse(res);
        if(this.search(items, product)) {
          success = false
        }
        else {
          items.push(product);
          AsyncStorage.setItem("WISHLIST",JSON.stringify(items));
        }
      }
      if(success) {
        Toast.show({
          text: 'Product added to your wishlist !',
          position: 'bottom',
          type: 'success',
          buttonText: 'Dismiss',
          duration: 3000
        });
      }
      else {
        Toast.show({
          text: 'This product already exist in your wishlist !',
          position: 'bottom',
          type: 'danger',
          buttonText: 'Dismiss',
          duration: 3000
        });
      }
    });
  }

  search(array, object) {
    for(var i=0; i<array.length; i++)
      if(JSON.stringify(array[i]) === JSON.stringify(object))
        return true;
    return false;
  }

}

const dummyProduct = {
  id: 2,
  title: 'Lenovo ThinkVision E2054 - LED monitor',
  description: "Lenovo ThinkVision E2054 - LED monitor - 1440 x 900 - IPS - 250 - 1000:1 - 7 ms - VGA - raven black",
  image: 'http://cdn.cnetcontent.com/fa/20/fa20d6db-7220-47cc-b555-42b9f60b6ba9.jpg',
  images: [
    'https://cdn.cnetcontent.com/67/e0/67e0dad1-3fab-44c7-b6b8-7f641a704ce5.jpg',
    'https://cdn.cnetcontent.com/a1/16/a11601c5-3213-4ac6-b786-337aacd86816.jpg',
    'https://cdn.cnetcontent.com/a5/93/a593c2d3-d197-47e3-bb43-5e0a007a7dd7.jpg',
    'https://cdn.cnetcontent.com/6d/e4/6de4daf0-a091-44b2-b992-fa3868c862f9.jpg'
  ],
  price: '£120',
  colors: ['Red', 'Blue', 'Black'],
  sizes: ['21', '32', '43' ],
  category: 'ELECTRONIC',
  similarItems: [
    {id: 10, title: 'Apple Mac mini', price: '£478.51', image: 'http://cdn.cnetcontent.com/2c/69/2c69e400-be73-4334-b521-b6c618d770fa.jpg'},
    {id: 11, title: 'Lenovo ThinkVision E2054 - LED monitor', price: '£101', image: 'http://cdn.cnetcontent.com/fa/20/fa20d6db-7220-47cc-b555-42b9f60b6ba9.jpg'},
    {id: 12, title: 'BUFFALO BS-XP Series BS-XP2008', price: '£510.31', image: 'http://www.abs-projects.co.uk/absretailnop/content/images/thumbs/default-image_550.png'}
  ]
};
 
 