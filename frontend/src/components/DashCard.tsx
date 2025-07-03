 
interface DashCardProps {
  heading: string;
  users: number;
  photo: string;
  description: string;
}

const DashCard: React.FC<DashCardProps> = ({ heading, users, photo, description }) => {
  // ...
  return (
    <div className='w-[280px] h-[160px] flex flex-col bg-white rounded-2xl p-4'>
      <div className='w-full h-full flex'>
        <div className='w-full h-full flex flex-col gap-2'>
          <p className=" text-sm text-neutral-600">{heading}</p>
          <span className=" text-2xl font-semibold">{users}</span>
        </div>
        <img
        className=" h-10 w-10"
        src={photo} />
      </div>
      <p className='w-full text-neutral-600 text-sm'>{description}</p>
    </div>
  );
};

export default DashCard;
