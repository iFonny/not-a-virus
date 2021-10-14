import { Url } from 'api/urls';

interface Props {
  url: Url;
}

export function UrlDetails({ url }: Props) {
  return <div>gg url cree (show url view ici) {JSON.stringify(url)}</div>;
}

export default UrlDetails;
