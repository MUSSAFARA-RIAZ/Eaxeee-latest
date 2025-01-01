import { ReactComponent as MusicIcon } from "../../Assets/Images/MetaModellerImages/music.svg";
import { ReactComponent as Diamond } from "../../Assets/Images/MetaModellerImages/music-icons/diamond-shape-svgrepo-com.svg";
import { ReactComponent as MusicLibraryIcon } from "../../Assets/Images/MetaModellerImages/music-icons/music-library-svgrepo-com.svg";
import { ReactComponent as MusicNote3Icon } from "../../Assets/Images/MetaModellerImages/music-icons/music-note-3-svgrepo-com.svg";
import { ReactComponent as MusicNote4Icon } from "../../Assets/Images/MetaModellerImages/music-icons/music-note-4-svgrepo-com.svg";
import { ReactComponent as MusicNoteSlashIcon } from "../../Assets/Images/MetaModellerImages/music-icons/music-note-slash-svgrepo-com.svg";
import { ReactComponent as VehicleIcon } from "../../Assets/Images/MetaModellerImages/vehicle.svg";
import { ReactComponent as ArrowRampRightIcon } from "../../Assets/Images/MetaModellerImages/vehicle-icons/arrow-ramp-right-svgrepo-com.svg";
import { ReactComponent as VehicleBicycleIcon } from "../../Assets/Images/MetaModellerImages/vehicle-icons/vehicle-bicycle-svgrepo-com.svg";
import { ReactComponent as VehicleCarIcon } from "../../Assets/Images/MetaModellerImages/vehicle-icons/vehicle-car-svgrepo-com.svg";
import { ReactComponent as VehicleShipIcon } from "../../Assets/Images/MetaModellerImages/vehicle-icons/vehicle-ship-svgrepo-com.svg";
import { ReactComponent as MedicalIcon } from "../../Assets/Images/MetaModellerImages/medical.svg";
import { ReactComponent as MedicalBottleIcon } from "../../Assets/Images/MetaModellerImages/medical-icons/medical-bottle-svgrepo-com.svg";
import { ReactComponent as MedicalCircleIcon } from "../../Assets/Images/MetaModellerImages/medical-icons/medical-circle-svgrepo-com.svg";
import { ReactComponent as MedicalKitIcon } from "../../Assets/Images/MetaModellerImages/medical-icons/medical-kit-svgrepo-com.svg";

// Now update your `SvgIconsCategoryArray` with the imported components:

const SvgIconsCategoryArray = [
  {
    id: "Music",
    label: "Music",
    image: MusicIcon, // Use React component
    relatedIcons: [
      {
        id: "Diamond",
        label: "Diamond",
        image: Diamond, // Use React component
      },
      {
        id: "Music Library",
        label: "Music Library",
        image: MusicLibraryIcon, // Use React component
      },
      {
        id: "Music Note 3",
        label: "Music Note 3",
        image: MusicNote3Icon, // Use React component
      },
      {
        id: "Music Note 4",
        label: "Music Note 4",
        image: MusicNote4Icon, // Use React component
      },
      {
        id: "Music Note Slash",
        label: "Music Note Slash",
        image: MusicNoteSlashIcon, // Use React component
      },
    ],
  },
  {
    id: "Vehicle",
    label: "Vehicle",
    image: VehicleIcon, // Use React component
    relatedIcons: [
      {
        id: "Arrow Ramp Right",
        label: "Arrow Ramp Right",
        image: ArrowRampRightIcon, // Use React component
      },
      {
        id: "Vehicle Bicycle",
        label: "Vehicle Bicycle",
        image: VehicleBicycleIcon, // Use React component
      },
      {
        id: "Vehicle Car",
        label: "Vehicle Car",
        image: VehicleCarIcon, // Use React component
      },
      {
        id: "Vehicle Ship",
        label: "Vehicle Ship",
        image: VehicleShipIcon, // Use React component
      },
    ],
  },
  {
    id: "Medical",
    label: "Medical",
    image: MedicalIcon, // Use React component
    relatedIcons: [
      {
        id: "Medical Bottle",
        label: "Medical Bottle",
        image: MedicalBottleIcon, // Use React component
      },
      {
        id: "Medical Circle",
        label: "Medical Circle",
        image: MedicalCircleIcon, // Use React component
      },
      {
        id: "Medical Kit",
        label: "Medical Kit",
        image: MedicalKitIcon, // Use React component
      },
    ],
  },
];

export const GetSvgIconImage = (iconID) => {
  // Search for the iconID in each category's relatedIcons
  const foundIcon = SvgIconsCategoryArray.map((category) =>
    category.relatedIcons.find((icon) => icon.id === iconID)
  ).find((icon) => icon); // Flatten the results and find the first match

  return foundIcon ? foundIcon.image : null; // Return the image or null if not found
};

export const GetIconsByCategory = (category) => {
  if (category === "all") {
    // Return a single flattened array of all related icons
    return SvgIconsCategoryArray.flatMap((cat) => cat.relatedIcons);
  } else {
    // Find the specific category and return its related icons
    const foundCategory = SvgIconsCategoryArray.find(
      (cat) => cat.label.toLowerCase() === category.toLowerCase()
    );
    return foundCategory ? foundCategory.relatedIcons : [];
  }
};

export const GetAllCategoryNames = () => {
  // Map the category names into an array
  return SvgIconsCategoryArray.map((category) => category.id);
};
