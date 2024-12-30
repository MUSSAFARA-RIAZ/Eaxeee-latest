const filterOptions = [
    {
        id: "Music",
        label: "Music",
        image: require("../../Assets/Images/MetaModellerImages/music.svg").default,
        text: "Music",
        relatedIcons: [
            { id: require("../../Assets/Images/MetaModellerImages/music-icons/music-library-svgrepo-com.svg").default },
            { id: require("../../Assets/Images/MetaModellerImages/music-icons/music-note-3-svgrepo-com.svg").default },
            { id: require("../../Assets/Images/MetaModellerImages/music-icons/music-note-4-svgrepo-com.svg").default },
            { id: require("../../Assets/Images/MetaModellerImages/music-icons/music-note-slash-svgrepo-com.svg").default },
        ],
    },
    {
        id: "Vehicle",
        label: "Vehicle",
        image: require("../../Assets/Images/MetaModellerImages/vehicle.svg").default,
        text: "Vehicle",
        relatedIcons: [
            { id: require("../../Assets/Images/MetaModellerImages/vehicle-icons/arrow-ramp-right-svgrepo-com.svg").default },
            { id: require("../../Assets/Images/MetaModellerImages/vehicle-icons/vehicle-bicycle-svgrepo-com.svg").default },
            { id: require("../../Assets/Images/MetaModellerImages/vehicle-icons/vehicle-car-svgrepo-com.svg").default },
            { id: require("../../Assets/Images/MetaModellerImages/vehicle-icons/vehicle-ship-svgrepo-com.svg").default },
        ],
    },
    {
        id: "Medical",
        label: "Medical",
        image: require("../../Assets/Images/MetaModellerImages/medical.svg").default,
        text: "Medical",
        relatedIcons: [
            { id: require("../../Assets/Images/MetaModellerImages/medical-icons/medical-bottle-svgrepo-com.svg").default },
            { id: require("../../Assets/Images/MetaModellerImages/medical-icons/medical-circle-svgrepo-com.svg").default },
            { id: require("../../Assets/Images/MetaModellerImages/medical-icons/medical-kit-svgrepo-com.svg").default },
        ],
    },
];

export default filterOptions;
