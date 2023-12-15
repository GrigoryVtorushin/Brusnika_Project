import React from 'react';
import {Map, ObjectManager, Placemark, YMaps} from "@pbe/react-yandex-maps";
import {ad, useAds} from "../Store/store";


const MapComponent = () => {

    const ads: ad[] = useAds(state => state.ads)

    const mapData = {
        center: [56.8519, 60.6122],
        zoom: 9,
    };
    let coordinates: any[] = [];

    ads.forEach(ad => {
        coordinates.push([ad.lat, ad.lng])
    })
    return (
        <YMaps>
            <Map defaultState={mapData} width={"100%"} height={'100%'}>
                {coordinates.map(coordinate => <Placemark geometry={coordinate} />)}
                <ObjectManager
                    options={{
                        clusterize: true,
                        gridSize: 32,
                    }}
                    objects={{
                        openBalloonOnClick: true,

                    }}
                    clusters={{
                        preset: "islands#redClusterIcons",
                    }}
                    modules={[
                        "objectManager.addon.objectsBalloon",
                        "objectManager.addon.objectsHint",
                    ]}

                />
            </Map>
        </YMaps>

    );
};

export default MapComponent;