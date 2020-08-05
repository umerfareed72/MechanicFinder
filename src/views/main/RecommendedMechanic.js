import React, { Component } from 'react';
import  { View,Image,Text ,StyleSheet} from 'react-native';
import { Card,CardItem, Right } from 'native-base';
import Entypo from "react-native-vector-icons/Entypo"
import StarRating from "react-native-star-rating"
import { TouchableOpacity } from 'react-native-gesture-handler';
class RecommendedMechanic extends Component { 
    constructor(){
        super()
    }  
    render() { 
        return (   
            
            <TouchableOpacity  onPress={()=>{this.props.navigation.navigate("HomeDetail")}}>
  
            <CardItem style={{borderBottomWidth:1}}>

            <View>
                <Image style={{ height: 90, width: 60 }}
                    source={this.props.imageUri} />
            </View>   
            <Right style={{ flex: 1, alignItems: 'flex-start', height: 90, paddingHorizontal: 20 }}>
           
                <Text style={{fontSize:20,marginBottom:8}}>{this.props.mechanicname}</Text>
                <View style={{flexDirection:"row",right:5}}>
                <Entypo
          name="location-pin"
          color="#000000"
          size={20}
          style={{ alignSelf: "flex-start", }}
        ></Entypo>
                <Text style={{ color: 'grey', fontSize: 15 }}>{this.props.location}</Text></View>
                <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#c4402f' }}>{this.props.Price}</Text>
           

                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={this.props.rating}
                    starSize={12}
                    fullStarColor='orange'
                    emptyStarColor='orange'


                />
            </Right>
         
        </CardItem>
        
        </TouchableOpacity>
        );
        
    }
}
 
export default RecommendedMechanic;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});