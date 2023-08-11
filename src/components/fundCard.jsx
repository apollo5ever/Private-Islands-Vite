export default function FundCard(props) {
  const deadline = new Date(props.deadline * 1000);
  const deadlineString =
    (deadline.getMonth() + 1).toString() + '/' + deadline.getDate().toString();

  return (
    <div className="ProfileCard">
      <h1>{props.name}</h1>
      <h3>Initiated by {props.profile}</h3>
      <img src={props.image} />
      <p>{props.tagline}</p>
      <p>
        Goal:{props.goal / 100000} Dero by {deadlineString}{' '}
      </p>
      <b>Click to See More</b>
    </div>
  );
}
