import { exec } from '../../../redux-core/api';

export const requestGetWatchlist = async () => {
    return exec({
        method: 'GET',
        path: `watchlist`
    });
}
