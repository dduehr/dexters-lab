import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import dexter from '../assets/dexter-landscape.svg';

export default function Home() {
    return (
        <Card>
            <Image src={dexter} />
        </Card>
    );
}