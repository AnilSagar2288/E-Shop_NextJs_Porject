import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    navbar:{
        backgroundColor:'#203040',
        '& a':{
            color:'#ffffff',
            marginLeft:10,
        },
    },
    brand:{
        fontWeight:'bold',
        fontSize:'1.5rem'
    },
    grow:{
        flexGrow:1,
    },
    main:{
        minHeight:'85vh',
    },
    footer:{
        textAlign:'center',
    },
    section:{
        marginTop:10,
        marginBottom:10,
    },
    forms:{
        maxWidth:800,
        margin:'0 auto',
    },
    navbarButton:{
        color:'#ffffff',
        textTransform:'initial'
    },
    transparentBackground:{
        backgroundColor:'Transparent'
    },
});

export default useStyles