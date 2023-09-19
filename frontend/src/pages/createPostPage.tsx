import Post from '../components/Home/Post';
import { connect } from 'react-redux';
import { triggerLogout } from '../store/Actions/authAction';
import CreatePost from '../components/Home/CreatePost';

const mapStateToProps = (state:any) => ({
  isLogin:state.authReducer.isLogin,
  userData:state.authReducer.data,
})
const mapDispatchToProps=(dispatch:any)=>({
  handleLogout:()=>dispatch(triggerLogout()),
})

export default connect(mapStateToProps,mapDispatchToProps)(CreatePost);
