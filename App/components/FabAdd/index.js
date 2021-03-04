import React, { Component } from 'react';
import { Button, Icon, Fab, Text} from 'native-base';

function FabAdd({addProduct, addBairro, addBanner}){

    const [active, setActive] = React.useState(false)

    return (
      <>
        <Fab
          active={active}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: '#fff' }}
          position="bottomRight"
          onPress={() => setActive(!active)}>
          <Icon style={{ fontSize: 30, color: 'black' }} type='MaterialCommunityIcons' name="plus" />
          <Button style={{ backgroundColor: '#34A34F'}} onPressIn={() => {addProduct(); setActive(!active)}}>
            <Icon type='MaterialCommunityIcons' name="plus-box-multiple" />
          </Button>
          <Button style={{ backgroundColor: '#3B5998'}} onPressIn={() => {addBairro(); setActive(!active)}}>
            <Icon type='MaterialCommunityIcons' name="moped"/>
          </Button>
          <Button  style={{ backgroundColor: '#DD5144' }} onPressIn={() => {addBanner(); setActive(!active)}}>
            <Icon type='MaterialCommunityIcons' name="check-decagram" />
          </Button>
        </Fab>
      </>
    );

}

export default FabAdd;