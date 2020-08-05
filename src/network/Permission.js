import { PermissionsAndroid } from 'react-native';

export async function getLocationPermission() {
    var response = false;
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                'title': 'Halaqah',
                'message': 'Halaqah access to your location '
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the location")
            // alert("You can use the location");
            response = true;
        } else {
            console.log("location permission denied");
            alert("Location permission denied, you cannot use location features.");
        }
    } catch (err) {
        console.warn(err);
        alert(err);
    }
    return response;
}