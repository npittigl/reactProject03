// import axios
import axios from 'axios';
// import hooks from react
import { useState, useEffect } from 'react';

// function to retrieve random photos from Unsplash API
function GetImage() {
    // declared state to store api data
    const [images, setImage] = useState([]);

    // define side effect that updates images state
    useEffect(() => {
        // function to trigger axios request for api data from Unsplash API 
        const getImages = () => {
            axios({
                url: 'https://api.unsplash.com/photos/random',
                method: 'GET',
                dataResponse: 'json',
                params: {
                    client_id: 'zoWIzYakwlIckWjy1lUqA9KNia2gQp0aH1dmsbAf-wc',
                    collections: '2738300',
                    count: 1
                }
            }).then((apiData) => {
                // store api data in variable
                const imagesArray = apiData.data;

                // filter out specific unwanted images in collection based on their id number
                const filteredImagesArray = imagesArray.filter((imageItem) => {
                    return imageItem.id !== '5c5VcFshOds' &&
                        imageItem.id !== '8lnbXtxFGZw' &&
                        imageItem.id !== 'W8Qqn1PmQH0' &&
                        imageItem.id !== 'G6G93jtU1vE' &&
                        imageItem.id !== 'fgmf2Eyrwm4' &&
                        imageItem.id !== 'nDeo4F3Zq28' &&
                        imageItem.id !== 'c333d6YEhi0' &&
                        imageItem.id !== 'gGbuETcoKjw' &&
                        imageItem.id !== 'bV_mp5XqWc4' &&
                        imageItem.id !== 'zunGugEsJCE' &&
                        imageItem.id !== 'l1AdCsEnjh0' &&
                        imageItem.id !== 'vKBdY7e7KFk' &&
                        imageItem.id !== 'MYu49bghVAM' &&
                        imageItem.id !== 'Ncn1jiEe-Wc' &&
                        imageItem.id !== '09AhDCedXF8' &&
                        imageItem.id !== 'UyNrNfdKjwg';
                });

                // update state with array filtered images
                setImage(filteredImagesArray);
            });
        }
        // call function to trigger api request
        getImages();
        // empty dependency array so image stored on mount/rerender
    }, [])

    // Map over array to populate HTML elements with necessary data to render when component called
    return (
        <>
            {images.map(({ id, alt_description, urls }) =>
                <div key={id}>
                    <img src={urls.small} alt={alt_description} />
                </div>
            )}
        </>
    )
}

export default GetImage;
