CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAllProperties`()
BEGIN
	SELECT * FROM properties;
END