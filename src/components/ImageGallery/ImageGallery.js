import { List } from "./ImageGallery.styled"

import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";


export const ImageGallery = ({onPictures}) => {
    return <List >
        {onPictures.map((picture) => {
            return <ImageGalleryItem key={picture.id} onPicture={picture}/>
        })}
</List>
}

