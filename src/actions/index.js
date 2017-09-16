import axios from 'axios'

export const selectUser = (user) => {
    console.log("You clicked on user: ", user.first);
    return {
        type: 'USER_SELECTED',
        payload: user
    }
};

export const getToken = () => {
    axios({
        url: 'https://directline.botframework.com/v3/directline/tokens/generate',
        method: 'post',
        headers: {'Authorization': 'Bearer P5biGMHmc-I.cwA.NNs.x3PH-GapGinTLgJaIxrYOtUhFnRuGcRS9GbncMKG3Ew'}
    })
}
