
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import mainstyles from '../App.module.css';

export default function Creator(props:any) {
const history = useHistory();

   return (
    <div>
    
        <Button className={mainstyles.button} onClick={()=>history.push("/createnewtoken")}>Create New Token</Button>
    
    </div>
   );
}