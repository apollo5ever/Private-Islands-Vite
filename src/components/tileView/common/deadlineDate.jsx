// Utility function to format the deadline date and determine if it's expired
const formatDeadlineDate = (dateStr) => {
  const now = new Date();
  const deadline = new Date(dateStr * 1000);
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  };
  const deadlineString = deadline.toLocaleString('en-US', options);
  const expired = deadline < now;

  return { deadline: deadlineString, expired };
};

export const DeadlineDate = ({ date }) => {
  const { deadline, expired } = formatDeadlineDate(date);
  const className = expired ? 'text-error' : 'text-black';

  return <span className={className}>{deadline}</span>;
};
