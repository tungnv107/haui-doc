USE [HauiEgov]
GO

/****** Object:  Table [dbo].[Eg_VB]    Script Date: 11/5/2026 9:03:15 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Eg_VB](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[So] [int] NULL,
	[TrichYeu] [nvarchar](1000) NULL,
	[LoaiVanBan] [int] NULL,
	[LinhVuc] [int] NULL,
	[DoMat] [int] NULL,
	[DoKhan] [int] NULL,
	[NoiGui] [nvarchar](500) NULL,
	[NgayKy] [datetime] NULL,
	[NguoiKy] [nvarchar](150) NULL,
	[NgayNhan] [datetime] NULL,
	[NgayVaoSo] [datetime] NULL,
	[GhiChu] [nvarchar](500) NULL,
	[DinhKem] [nvarchar](500) NULL,
	[NoiDungLanhDao] [nvarchar](500) NULL,
	[NguoiChuTri] [int] NULL,
	[NgayTao] [datetime] NULL,
	[NguoiTao] [int] NULL,
	[NgaySua] [datetime] NULL,
	[NguoiSua] [int] NULL,
	[ThoiHan] [datetime] NULL,
	[IsDen] [int] NULL,
	[TrangThai] [int] NULL,
	[Status] [int] NULL,
	[SoHieu] [nvarchar](50) NULL,
	[LuuTru] [nvarchar](250) NULL,
	[SoBan] [int] NULL,
	[NgayHoanThanh] [datetime] NULL,
	[Comment] [ntext] NULL,
	[DvChuTri] [int] NULL,
	[DvThamGia] [nvarchar](250) NULL,
	[Logs] [nvarchar](max) NULL,
	[NgonNgu] [nvarchar](250) NULL,
	[SoTrang] [int] NULL,
	[FileVBTraLoi] [int] NULL,
	[VBTraLoi] [nvarchar](250) NULL,
	[NguoiGui] [int] NULL,
	[NgayGui] [datetime] NULL,
	[NgayBaoCao] [datetime] NULL,
	[DonViSoanThao] [int] NULL,
	[allowDownload] [bit] NULL,
	[GuiKhoVB] [bit] NULL,
	[TransactionID] [varchar](500) NULL,
 CONSTRAINT [PK_Eg_VB] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Eg_Vb_BaoLoi]    Script Date: 11/5/2026 9:03:15 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Eg_Vb_BaoLoi](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[IDVanBan] [int] NULL,
	[UserID] [int] NULL,
	[Msg] [nvarchar](500) NULL,
	[DateCreate] [datetime] NULL,
 CONSTRAINT [PK_Eg_Vb_BaoLoi] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Eg_VB_DuThao]    Script Date: 11/5/2026 9:03:15 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Eg_VB_DuThao](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[So] [int] NULL,
	[SoHieu] [nvarchar](50) NULL,
	[NgayVB] [date] NULL,
	[LoaiVanBanID] [int] NULL,
	[DoKhanID] [int] NULL,
	[DoMatID] [int] NULL,
	[LinhVucID] [int] NULL,
	[TrichYeu] [nvarchar](1000) NULL,
	[NguoiNhan] [varchar](max) NULL,
	[DonViNhan] [varchar](500) NULL,
	[DonViNhanNgoaiTruong] [nvarchar](500) NULL,
	[GhiChu] [nvarchar](1000) NULL,
	[DinhKem] [int] NULL,
	[TrangThaiID] [int] NULL,
	[NgayTao] [datetime] NULL,
	[NguoiTao] [int] NULL,
	[NgaySua] [datetime] NULL,
	[NguoiSua] [int] NULL,
	[LuuTru] [nvarchar](500) NULL,
	[Logs] [ntext] NULL,
	[DonVi] [int] NULL,
	[FilePDF] [int] NULL,
	[TransactionID] [varchar](500) NULL,
	[NguoiKy] [int] NULL,
	[NgayKyBanHanh] [datetime] NULL,
	[VanBanID] [int] NULL,
	[ThamQuyenBanHanh] [int] NULL,
	[HoSoKemTheo] [varchar](500) NULL,
	[signKemTheo] [bit] NULL,
	[TransactionIDKemTheo] [nvarchar](max) NULL,
 CONSTRAINT [PK_Eg_VB_DuThao] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Eg_VB_DuThao_TheoDoi]    Script Date: 11/5/2026 9:03:15 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Eg_VB_DuThao_TheoDoi](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[DuThaoID] [int] NULL,
	[NguoiGui] [int] NULL,
	[NguoiNhan] [int] NULL,
	[YKienXuLy] [ntext] NULL,
	[NgayGui] [datetime] NULL,
	[NgayDuyet] [datetime] NULL,
	[DaKy] [int] NULL,
 CONSTRAINT [PK_Eg_VB_DuThao_TheoDoi] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Eg_VB_DuThao_YKien]    Script Date: 11/5/2026 9:03:15 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Eg_VB_DuThao_YKien](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[DuThaoID] [int] NULL,
	[UserID] [int] NULL,
	[NoiDung] [ntext] NULL,
	[ResourceID] [int] NULL,
	[NgayGui] [datetime] NULL,
 CONSTRAINT [PK_Eg_VB_DuThao_YKien] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Eg_VB_DuThao1612]    Script Date: 11/5/2026 9:03:15 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Eg_VB_DuThao1612](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[So] [int] NULL,
	[SoHieu] [nvarchar](50) NULL,
	[NgayVB] [date] NULL,
	[LoaiVanBanID] [int] NULL,
	[DoKhanID] [int] NULL,
	[DoMatID] [int] NULL,
	[LinhVucID] [int] NULL,
	[TrichYeu] [nvarchar](1000) NULL,
	[NguoiNhan] [varchar](500) NULL,
	[DonViNhan] [varchar](500) NULL,
	[DonViNhanNgoaiTruong] [nvarchar](500) NULL,
	[GhiChu] [nvarchar](1000) NULL,
	[DinhKem] [int] NULL,
	[TrangThaiID] [int] NULL,
	[NgayTao] [datetime] NULL,
	[NguoiTao] [int] NULL,
	[NgaySua] [datetime] NULL,
	[NguoiSua] [int] NULL,
	[LuuTru] [nvarchar](500) NULL,
	[Logs] [ntext] NULL,
	[DonVi] [int] NULL,
	[FilePDF] [int] NULL,
	[TransactionID] [varchar](500) NULL,
	[NguoiKy] [int] NULL,
	[NgayKyBanHanh] [datetime] NULL,
	[VanBanID] [int] NULL,
	[ThamQuyenBanHanh] [int] NULL,
	[HoSoKemTheo] [varchar](500) NULL,
	[signKemTheo] [bit] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Eg_VB_GiaHan]    Script Date: 11/5/2026 9:03:15 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Eg_VB_GiaHan](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[IDVB] [int] NULL,
	[UserID] [int] NULL,
	[dateGH] [datetime] NULL,
	[DateCreate] [datetime] NULL,
	[TrangThai] [int] NULL,
 CONSTRAINT [PK_Eg_VB_GiaHan] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Eg_Vb_GiaoCapDuoi]    Script Date: 11/5/2026 9:03:15 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Eg_Vb_GiaoCapDuoi](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[IDYeuCau] [int] NULL,
	[NguoiTao] [int] NULL,
	[NguoiNhan] [int] NULL,
	[NgayTao] [datetime] NULL,
	[ThoiHanHoanThanh] [datetime] NULL,
	[TrangThai] [int] NULL,
	[GhiChu] [nvarchar](500) NULL,
	[NguoiSua] [int] NULL,
	[NgaySua] [datetime] NULL,
 CONSTRAINT [PK_Eg_Vb_GiaoCapDuoi] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Eg_Vb_GiaoViec]    Script Date: 11/5/2026 9:03:15 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Eg_Vb_GiaoViec](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[IDYeuCau] [int] NULL,
	[NguoiTao] [int] NULL,
	[ChuTri] [int] NULL,
	[ThamGia] [int] NULL,
	[NguoiSua] [int] NULL,
	[Ngaysua] [datetime] NULL,
	[NgayTao] [datetime] NULL,
	[TrangThai] [int] NULL,
 CONSTRAINT [PK_Vb_Eg_GiaoViec] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Eg_VB_LanhDao]    Script Date: 11/5/2026 9:03:15 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Eg_VB_LanhDao](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[IDVB] [int] NULL,
	[NguoiGui] [int] NULL,
	[NguoiNhan] [int] NULL,
	[DateCreate] [datetime] NULL,
	[Msg] [nvarchar](500) NULL,
	[TrangThai] [int] NULL,
	[DateMsg] [datetime] NULL,
 CONSTRAINT [PK_Eg_VB_LanhDao] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Eg_VB_LanhDao26032025]    Script Date: 11/5/2026 9:03:15 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Eg_VB_LanhDao26032025](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[IDVB] [int] NULL,
	[NguoiGui] [int] NULL,
	[NguoiNhan] [int] NULL,
	[DateCreate] [datetime] NULL,
	[Msg] [nvarchar](500) NULL,
	[TrangThai] [int] NULL,
	[DateMsg] [datetime] NULL
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Eg_VB_LienQuan]    Script Date: 11/5/2026 9:03:15 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Eg_VB_LienQuan](
	[DuThaoID] [int] NULL,
	[VanBanID] [int] NULL
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Eg_VB_LinhVuc]    Script Date: 11/5/2026 9:03:15 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Eg_VB_LinhVuc](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[TenLinhVuc] [nvarchar](250) NULL,
	[NguoiTao] [int] NULL,
	[NgayTao] [datetime] NULL,
	[NguoiSua] [int] NULL,
	[NgaySua] [datetime] NULL,
	[DonViLinhVuc] [int] NULL,
	[Locked] [bit] NULL,
 CONSTRAINT [PK_Eg_VB_LinhVuc] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Eg_VB_LinhVuc_DonVi]    Script Date: 11/5/2026 9:03:15 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Eg_VB_LinhVuc_DonVi](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Ten] [nvarchar](200) NULL,
	[NguoiTao] [int] NULL,
	[NgayTao] [datetime] NULL,
	[NguoiSua] [int] NULL,
	[NgaySua] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Eg_VB_LoaiVanBan]    Script Date: 11/5/2026 9:03:15 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Eg_VB_LoaiVanBan](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[TenLoaiVanBan] [nvarchar](150) NULL,
	[NguoiTao] [int] NULL,
	[NgayTao] [datetime] NULL,
	[NguoiSua] [int] NULL,
	[NgaySua] [datetime] NULL,
	[type] [int] NULL,
 CONSTRAINT [PK_Eg_VB_LoaiVanBan] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Eg_Vb_NguoiKy]    Script Date: 11/5/2026 9:03:15 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Eg_Vb_NguoiKy](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[HoTenNguoiKy] [nvarchar](100) NULL,
	[NgayTao] [datetime] NULL,
	[NguoiTao] [int] NULL,
	[NgaySua] [datetime] NULL,
	[NguoiSua] [int] NULL
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Eg_VB_NoiGui]    Script Date: 11/5/2026 9:03:15 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Eg_VB_NoiGui](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[TenNoiGui] [nvarchar](150) NULL,
	[NguoiTao] [int] NULL,
	[NgayTao] [datetime] NULL,
	[NguoiSua] [int] NULL,
	[NgaySua] [datetime] NULL,
 CONSTRAINT [PK_Eg_VB_NoiGui] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Eg_VB_NoiNhan]    Script Date: 11/5/2026 9:03:15 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Eg_VB_NoiNhan](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[VanBanID] [int] NULL,
	[DonVi] [int] NULL,
	[NguoiTao] [int] NULL,
	[NgayTao] [datetime] NULL,
 CONSTRAINT [PK_Eg_VB_NoiNhan] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Eg_Vb_PheDuyet]    Script Date: 11/5/2026 9:03:15 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Eg_Vb_PheDuyet](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[IDYeuCau] [int] NULL,
	[LanhDaoID] [int] NULL,
	[Noidung] [nvarchar](500) NULL,
	[Ngaytao] [datetime] NULL,
	[TrangThai] [int] NULL,
 CONSTRAINT [PK_Eg_Vb_PheDuyet] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Eg_Vb_PhoCap]    Script Date: 11/5/2026 9:03:15 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Eg_Vb_PhoCap](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[IDVanBan] [int] NULL,
	[UserID] [int] NULL,
	[NguoiTao] [int] NULL,
	[NgayTao] [datetime] NULL,
	[TrangThai] [int] NULL,
	[NgaySua] [datetime] NULL,
	[NguoiSua] [int] NULL,
 CONSTRAINT [PK_Eg_Vb_PhoCap] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Eg_VB_QuaTrinhXuLy]    Script Date: 11/5/2026 9:03:15 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Eg_VB_QuaTrinhXuLy](
	[IDVanBan] [int] NOT NULL,
	[NoiDungLanhDao] [nvarchar](500) NULL,
	[NguoiChuTri] [int] NULL,
	[NguoiThamGia] [text] NULL,
	[QuaTrinhXuLy] [text] NULL,
	[NguoiTao] [int] NULL,
	[NgayTao] [datetime] NULL,
	[NguoiSua] [int] NULL,
	[NgaySua] [datetime] NULL,
 CONSTRAINT [PK_Eg_VB_QuaTrinh_XuLy] PRIMARY KEY CLUSTERED 
(
	[IDVanBan] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Eg_VB_SoHieu]    Script Date: 11/5/2026 9:03:15 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Eg_VB_SoHieu](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[SoDen] [nvarchar](50) NULL,
	[DuoiDen] [nvarchar](50) NULL,
	[SoDi] [nvarchar](50) NULL,
	[DuoiDi] [nvarchar](50) NULL,
	[NguoiTao] [int] NULL,
	[NguoiSua] [int] NULL,
	[NgayTao] [datetime] NULL,
	[NgaySua] [datetime] NULL,
 CONSTRAINT [PK_Eg_VB_SoHieu] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Eg_Vb_ThamQuyenBanHanh]    Script Date: 11/5/2026 9:03:15 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Eg_Vb_ThamQuyenBanHanh](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NULL,
 CONSTRAINT [PK_Eg_Vb_ThamQuyenBanHanh] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Eg_VB_TheoDoi]    Script Date: 11/5/2026 9:03:15 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Eg_VB_TheoDoi](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[VanBanID] [int] NULL,
	[NguoiNhan] [int] NULL,
	[NoiDung] [text] NULL,
	[NgayGui] [datetime] NULL,
	[NgayNhan] [datetime] NULL,
	[SoLanXem] [int] NULL,
	[TrangThai] [int] NULL,
	[NguoiTao] [int] NULL,
	[ThoiHan] [datetime] NULL,
	[NgayBaoCao] [datetime] NULL,
 CONSTRAINT [PK_Eg_VB_TheoDoi] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Eg_VB_TrangThaiDuThao]    Script Date: 11/5/2026 9:03:15 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Eg_VB_TrangThaiDuThao](
	[ID] [int] NOT NULL,
	[Ten] [nvarchar](250) NULL,
 CONSTRAINT [PK_Eg_VB_DuThao_TrangThai] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Eg_VB] ADD  CONSTRAINT [DF_Eg_VB_Logs_1]  DEFAULT (N'[]') FOR [Logs]
GO


USE [HauiEgov]
GO

/****** Object:  Table [dbo].[GU_DocumentFields]    Script Date: 11/5/2026 9:03:39 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[GU_DocumentFields](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NULL,
	[Priority] [int] NULL,
	[Type] [varchar](250) NULL,
 CONSTRAINT [PK_GU_DocumentFields] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[GU_DocumentStatus]    Script Date: 11/5/2026 9:03:39 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[GU_DocumentStatus](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](150) NULL,
 CONSTRAINT [PK_GU_DocumentStatus] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[GU_DocumentTypes]    Script Date: 11/5/2026 9:03:39 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[GU_DocumentTypes](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NULL,
	[Priority] [int] NULL,
	[Type] [varchar](250) NULL,
 CONSTRAINT [PK_GU_DocumentTypes] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[GU_HaUIDocument]    Script Date: 11/5/2026 9:03:39 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[GU_HaUIDocument](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Sign] [nvarchar](150) NULL,
	[Abstract] [nvarchar](500) NULL,
	[IssuedDate] [date] NULL,
	[EffectiveDate] [date] NULL,
	[OrganizationID] [int] NULL,
	[TypeID] [int] NULL,
	[FieldID] [int] NULL,
	[ResourceID] [int] NULL,
	[InsertedBy] [int] NULL,
	[InsertedTime] [datetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [datetime] NULL,
	[StatusID] [int] NULL,
	[IsAll] [int] NULL,
	[State] [int] NULL,
 CONSTRAINT [PK_GU_HaUIDocument] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[GU_HaUIDocumentUser]    Script Date: 11/5/2026 9:03:39 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[GU_HaUIDocumentUser](
	[DocumentID] [int] NOT NULL,
	[ToID] [int] NOT NULL,
	[IsRead] [bit] NULL,
 CONSTRAINT [PK_GU_HaUIDocumentUser] PRIMARY KEY CLUSTERED 
(
	[DocumentID] ASC,
	[ToID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[GU_Organizations]    Script Date: 11/5/2026 9:03:39 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[GU_Organizations](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NULL,
	[Priority] [int] NULL,
	[Type] [varchar](250) NULL,
 CONSTRAINT [PK_GU_Organizations] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[GU_HaUIDocument] ADD  CONSTRAINT [DF_GU_HaUIDocument_InsertedTime]  DEFAULT (getdate()) FOR [InsertedTime]
GO

