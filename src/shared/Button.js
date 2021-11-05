import classNames from "classnames";

const Button = ({ children, className, ...pros }) => {
  return (
    <>
      <button className={classNames([className])} {...pros}>
        {children}
      </button>
    </>
  );
};

export default Button;
