import React from 'react';

import { Firebase } from '../services/firebase';

export const FireBaseContext = React.createContext<null | Firebase>(null);
