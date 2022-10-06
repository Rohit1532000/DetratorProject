import React from 'react'
import { useEffect, useState } from 'react'
import { Container } from '@mui/system';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import RecommendIcon from '@mui/icons-material/Recommend';
import Button from '@mui/material/Button';

const Post = () => {

    const [collectedData, setData] = useState([]);
    const [total, setTotal] = useState('');
    const [isLoading, setIsloading] = useState(true);


    const fetchApiData = async () => {
        try {
            let myData = await fetch("https://dummyjson.com/posts");
            let CatchedData = await myData.json();
            setIsloading(false);
            let finalData = CatchedData.posts;
            let limit = CatchedData.limit;
            setData(finalData);
            setTotal(limit);
        } catch (error) {
            console.log(error);
        }
    }

    const [visible, setvisible] = useState(3);

    const [showResults, setShowResults] = useState(false)
    const loadmore = () => {
        setvisible((prev) => prev + 3)
        if (visible >= collectedData.length) {
            setShowResults(true)
        }
    }
    useEffect(() => {
        fetchApiData()
    }, []);

    if (isLoading) {
        return <h1 style={{ textAlign: "center" }}>Loading Data....</h1>
    }
    return (
        <>
            <Container maxWidth="md">
                <h6 className='searchResult' style={{ textAlign: "center" }}><u>Showing 1 - {visible} from {total}</u> </h6>
                {collectedData.slice(0, visible).map(function (val) {
                    return (<>

                        <Paper
                            sx={{
                                p: 2,
                                margin: 'auto',
                                marginTop: '20px',
                                maxWidth: 700,
                                flexGrow: 1,
                                backgroundColor: (theme) =>
                                    theme.palette.mode === 'dark' ? '#1A2027' : 'whitesmoke',
                                boxShadow: "0 2px 8px 0 black",
                            }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm container>
                                    <Grid item xs container direction="column" spacing={2}>
                                        <Grid item xs>
                                            <Typography sx={{ fontWeight: 'bold' }} gutterBottom variant="h6" component="div">
                                                {val.title}
                                            </Typography>
                                            <Typography variant="body2">
                                                {val.body}
                                            </Typography>
                                            <Typography sx={{ marginTop: '5px' }} variant="body2" color="text.secondary">
                                                UserId: {val.userId}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography sx={{ cursor: 'pointer' }} variant="body2">
                                                <span>Tags:</span> <span style={{ color: "blue" }}>#{val.tags[0]}, #{val.tags[1]},  #{val.tags[2]}</span>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle1" component="div">
                                            <RecommendIcon />:{val.reactions}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>

                    </>
                    )
                })}
                <center> <Button variant="contained" sx={{ cursor: 'pointer', marginTop: "15px" , marginBottom:"15px" }} onClick={loadmore}> {showResults ? "No More" : "Show More"} </Button></center>
            </Container>
        </>
    )
}

export default Post