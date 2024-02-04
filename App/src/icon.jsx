import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import HomeIcon from '@mui/icons-material/Home';

export default function Icon(props){
    if (props.value == 0){
        return HomeIcon
    }
    if (props.value == 1){
        return PlaylistPlayIcon
    }
    if (props.value == 2){
        return LibraryMusicIcon
    }
    if (props.value == 3){
        return PersonSearchIcon
    }
}