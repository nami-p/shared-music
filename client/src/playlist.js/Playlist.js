
import { DataGrid } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import { useLocation } from "react-router-dom";
import StarsIcon from '@mui/icons-material/Stars';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import {  Box, IconButton, Tooltip } from "@mui/material";
import PlaylistHeader from "./PlaylistHeader";
import { useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import axios from "axios";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { useSelector } from "react-redux";


export default function Playlist(props) {
    const [hoverId, setHoverId] = useState(null);
    const location = useLocation();
    const category = location.state?.category;
    const isPlaylist = location.state?.isPlaylist;
    const [currentTrack, setTrackIndex] = useState(0);
    const [displayPlayer, setDisplayPlayer] = useState(false);
    const userId = useSelector((state) => state.login.user?.id);
    let like = false;


    async function isLike(songId) {
        try {
            const response = await axios.get(`https://localhost:7001/sharedMusic/SongToUser/GetByUserAndSong/${songId}/${userId}`)
            return response.data?.love;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
    const shuffleRows = () => {
        const shuffledSongs = [...songs].sort(() => Math.random() - 0.5);
        const shuffledPlaylist = shuffledSongs.map((s, index) => ({ ...s, id: index + 1 }));
        setSongs(shuffledPlaylist);
    };
    const handleClickNext = () => {
        console.log('click next')
        setTrackIndex((currentTrack) =>
            currentTrack < playlist.length - 1 ? currentTrack + 1 : 0
        );
    };

    const handleEnd = () => {
        console.log('end')
        setTrackIndex((currentTrack) =>
            currentTrack < playlist.length - 1 ? currentTrack + 1 : 0
        );
    };

    const playAsong = async (index) => {
        if (!displayPlayer) {
            setDisplayPlayer(true);
        }
        setTrackIndex(index);
        try {
            const formData = new FormData();
            formData.append('NumOfPlays', songs[index].numOfPlays+1);
            await axios.put(`https://localhost:7001/api/Song/${songs[index].songId}`,formData);
        }
        catch (err) {
            console.log(err)
        }
    }
    const DownloadAsong = async (paramsRow) => {
        try {
            const response = await axios.get(`https://localhost:7001/api/Song/downloadSong/${paramsRow.songName}`, {
                responseType: 'blob' // Set responseType to 'blob' to handle binary data
            });

            // Create a blob object from the response data
            const blob = new Blob([response.data], { type: response.headers['content-type'] });

            // Create a temporary URL for the blob
            const url = window.URL.createObjectURL(blob);

            // Create a link element to trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', paramsRow.songName); // Set the download attribute with the file name
            document.body.appendChild(link);

            // Trigger the click event on the link to start the download
            link.click();

            // Cleanup: Remove the link and revoke the URL
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.log(err);
        }
    };

    const convertLengthToTime = (length) => {
        const minutes = Math.floor(length); // Extract the integer part for minutes
        const seconds = Math.round((length - minutes) * 100); // Convert decimal part to seconds and round to two decimal places

        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }


    const [songs,setSongs] =useState( location.state?.songs.map((song, index) => {
        if (userId) {
            like = isLike(song.id);
            console.log(`like[${index}]=${like}`);
        }
        return ({
            songId:song.id,
            id: index + 1,
            name: song.name,
            image: { avatar: song.image },
            detailes: {
                length: convertLengthToTime(song.length),
                raters: song.numOfRaters
            },
            actions: {
                collection: "add to collection",
                like: "like",
                download: "free download"
            },
            song: song.song1,
            like,
            songName:song.songName,
            numOfPlays:song.numOfPlays,
        })
    }));
    

    const playlist = songs.map((s) => ({ src: s.song }));


    const columns = [
        { field: "id", headerName: "#", width: 40 },

        {
            field: "image",
            headerName: "TRACK",
            type: 'actions',
            width: 78,
            renderCell: (params) => {

                return (
                    <IconButton sx={{ padding: 0 }} onClick={() => playAsong(params.row.id - 1)}>
                        <Avatar
                            onMouseEnter={() => {
                                setHoverId(params.row.id);
                                //    <Box style = {{
                                //         color: 'rgb(255, 255, 255)',
                                //         background:' rgba(25, 27, 38, 0.64)',
                                //         opacity:1
                                //     }}/>
                            }}
                            onMouseLeave={() => setHoverId(null)}
                            sx={{ width: 56, height: 56 }}

                            variant="rounded"
                            src={params.value.avatar} className="playImage">
                        </Avatar>
                        {
                            params.row.id === hoverId && (
                                <Box style={{ position: 'absolute', top: '50%', left: '50%', zIndex: 2, transform: 'translate(-50%,-50%)', }}>
                                    <PlayArrowIcon sx={{ color: "#fff" }} />
                                </Box>
                            )
                        }
                    </IconButton >
                );
            }
        },
        {
            field: "name",
            headerName: "",
            width: 1000,

        },
        {
            field: "detailes",
            headerName: "DETAILS",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        {params.value.length}
                        {params.value.raters ? <StarsIcon fontSize="small" color="primary" sx={{ margin: "0.5rem" }}></StarsIcon> : <></>
                        }
                    </>
                );
            }
        },
        {
            field: "actions",
            type: 'actions',
            headerName: "ACTIONS",
            width: 100,
            renderCell: (params) => {
                return (
                    <>
                        <Tooltip title={params.value.collection}>
                            <BookmarkBorderIcon sx={{ margin: "0.5rem" }} fontSize="small" color="primary"></BookmarkBorderIcon>
                        </Tooltip>
                        <Tooltip title={params.value.like}>
                            <FavoriteBorderIcon sx={{ margin: "0.5rem" }} fontSize="small" color="primary"></FavoriteBorderIcon>
                        </Tooltip>
                        <IconButton sx={{ padding: 0 }} onClick={() => DownloadAsong(params.row)}>
                            <Tooltip title={params.value.download}>
                                <SaveAltIcon sx={{ margin: "0.5rem" }} fontSize="small" color="primary"></SaveAltIcon >
                            </Tooltip>
                        </IconButton>
                    </>
                );
            }
        },


    ];

    const rows = songs;

    return (
        <div>
            {isPlaylist && <PlaylistHeader Category={category} setDisplayPlayer={setDisplayPlayer} onShuffleClick={shuffleRows} />}
            <DataGrid

                sx={{
                    border: "none", padding: "1.8rem",
                    // disable cell selection style
                    '.MuiDataGrid-cell:focus': {
                        outline: 'none'
                    },
                }}
                rowHeight={80}
                rows={rows}
                columns={columns}
                pageSizeOptions={[5]}
                hideFooterSelectedRowCount
                selectionModel={[currentTrack]}
            />
            {/* <DataTable></DataTable> */}
            {displayPlayer && <AudioPlayer
                style={{
                    position: "fixed",
                    left: 0,
                    bottom: 0,
                    width: '100 %'
                }}
                
                autoPlay
                showSkipControls
                showJumpControls={false}
                src={playlist[currentTrack].src}
                onPlay={(e) => console.log(e,"now playing")}
                onClickNext={handleClickNext}
                onEnded={handleEnd}
                onError={() => { console.log('play error') }}
            // other props here
            />}
        </div>
    );
}