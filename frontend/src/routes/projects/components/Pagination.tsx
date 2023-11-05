import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { range } from '../../../utils/array';

type PaginationProps = {
    basePath: string;
    pageNr: number;
    pageCount: number;
}

export default function Pagination({ basePath, pageNr, pageCount }: PaginationProps) {
    return (
        <ul className="pagination ">
            <li key='prev' className={classNames('page-item', { 'disabled': +pageNr <= 0 })}>
                <Link className="page-link" to={`${basePath}/${+pageNr - 1}`} aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </Link>
            </li>
            {range(+pageCount).map(i => (
                <li key={`page ${i}`} className={classNames('page-item', { 'active pe-none': i == pageNr })}>
                    <Link className="page-link" to={`${basePath}/${i}`}>
                        {i + 1}
                    </Link>
                </li>))
            }
            <li key='next' className={classNames('page-item', { 'disabled': +pageNr + 1 >= pageCount })}>
                <Link className="page-link" to={`${basePath}/${+pageNr + 1}`} aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </Link>
            </li>
        </ul>
    );
}
