/**
* This is the Main file
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Container, Content, View, Left, Right, Button, Icon, Grid, Col } from 'native-base';
import { Actions } from 'react-native-router-flux';

// Our custom files and classes import
import Colors from '../Colors';
import Text from '../component/Text';
import Navbar from '../component/Navbar';
import SideMenu from '../component/SideMenu';
import SideMenuDrawer from '../component/SideMenuDrawer';
import Product from '../component/Product';


export default class Category extends Component {
  constructor(props) {
      super(props);
      this.state = {
        items: []
      };
  }

  componentWillMount() {
    var products = [
      {id: 1, title: 'Fujitsu E754 (BTO:E7540MXE41GB)', categoryId: 5, categoryTitle: 'PH2', price: '£1028', image: 'http://www.abs-projects.co.uk/absretailnop/content/images/thumbs/default-image_550.png', description: "PH2 i5 Bundle - Fujitsu E754 (BTO:E7540MXE41GB)"},
      {id: 2, title: 'Li-Ion - 5200 mAh (CBI3161A)', categoryId: 2, categoryTitle: 'Battery', price: '£51', image: 'http://cdn.cnetcontent.com/26/ff/26ff71f0-be3a-4758-9a37-f2a4daf5560c.jpg', description: "2-Power - laptop battery - Li-Ion - 5200 mAh (CBI3161A)"},
      {id: 10, title: 'DDR3 ECC Reg CL13 DIMM DR x4 w/TS', categoryId: 1, categoryTitle: 'Memories', price: '£51112', image: 'http://cdn.cnetcontent.com/ae/2a/ae2a9961-062f-4482-a4ae-6cace92efd3a.jpg', description: "16GB 1866MHz DDR3 ECC Reg CL13 DIMM DR x4 w/TS."},
      {id: 15, title: 'Lenovo ThinkVision E2054', categoryId: 5, categoryTitle: 'Screen', price: '£1028', image: 'http://cdn.cnetcontent.com/fa/20/fa20d6db-7220-47cc-b555-42b9f60b6ba9.jpg', description: "Lenovo ThinkVision E2054 - LED monitor - 19.5\u0026quot; - 1440 x 900 - IPS - 250 cd/mï¿½ - 1000:1 - 7 ms - VGA - raven black."},
      {id: 16, title: 'Cisco 1-port VDSL2/ADSL2', categoryId: 1, categoryTitle: 'CISCO', price: '£583.45', image: 'http://cdn.cnetcontent.com/eb/42/eb42766f-7723-49a1-af12-73e119c78c7a.jpg', description: "Cisco 1-port VDSL2/ADSL2+ EHWIC over ISDN - DSL modem - EHWIC - 100 Mbps."},
    ];
    this.setState({items: products});
  }

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
          <Container style={{backgroundColor: '#fdfdfd'}}>
            <Navbar left={left} right={right} title={this.props.title} />
            <Content padder>
              {this.renderProducts()}
            </Content>
          </Container>
      </SideMenuDrawer>
    );
  }

  renderProducts() {
    let items = [];
    let stateItems = this.state.items
    for(var i=0; i<stateItems.length; i+=2 ) {
      if(stateItems[i+1]) {
        items.push(
          <Grid key={i}>
            <Product key={stateItems[i].id} product={stateItems[i]} />
            <Product key={stateItems[i+1].id} product={stateItems[i+1]} isRight />
          </Grid>
        );
      }
      else {
        items.push(
          <Grid key={i}>
            <Product key={stateItems[i].id} product={stateItems[i]} />
            <Col key={i+1} />
          </Grid>
        );
      }
    }
    return items;
  }
}
