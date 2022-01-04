/****** Object:  Table [dbo].[diagnoses]    Script Date: 1/4/2022 5:40:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
Go

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='diagnoses' and xtype='U')
CREATE TABLE [dbo].[diagnoses](
	[output_id] [int] NULL,
	[text] [varchar](max) NULL,
	[name] [varchar](max) NULL,
	[confidence_score] [float] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[examinations]    Script Date: 1/4/2022 5:40:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='examinations' and xtype='U')
CREATE TABLE [dbo].[examinations](
	[output_id] [int] NULL,
	[text] [varchar](max) NULL,
	[name] [varchar](max) NULL,
	[confidence_score] [float] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[medications]    Script Date: 1/4/2022 5:40:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='medications' and xtype='U')
CREATE TABLE [dbo].[medications](
	[output_id] [int] NULL,
	[text] [varchar](max) NULL,
	[name] [varchar](max) NULL,
	[confidence_score] [float] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[reports]    Script Date: 1/4/2022 5:40:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='reports' and xtype='U')
CREATE TABLE [dbo].[reports](
	[output_id] [int] NULL,
	[output_date] [decimal](18, 0) NULL,
	[output_alg_version] [float] NULL,
	[patient_dob] [decimal](18, 0) NULL,
	[patient_gender] [varchar](1) NULL,
	[event_date] [decimal](18, 0) NULL,
	[orig_output_id] [varchar](255) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[symptoms]    Script Date: 1/4/2022 5:40:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='symptoms' and xtype='U')
CREATE TABLE [dbo].[symptoms](
	[output_id] [int] NULL,
	[text] [varchar](max) NULL,
	[name] [varchar](max) NULL,
	[confidence_score] [float] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='treatments' and xtype='U')
/****** Object:  Table [dbo].[treatments]    Script Date: 1/4/2022 5:40:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[treatments](
	[output_id] [int] NULL,
	[text] [varchar](max) NULL,
	[name] [varchar](max) NULL,
	[confidence_score] [float] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
