// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'auth_register_post201_response_user.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

const AuthRegisterPost201ResponseUserRoleEnum
    _$authRegisterPost201ResponseUserRoleEnum_ADMIN =
    const AuthRegisterPost201ResponseUserRoleEnum._('ADMIN');
const AuthRegisterPost201ResponseUserRoleEnum
    _$authRegisterPost201ResponseUserRoleEnum_DRIVER =
    const AuthRegisterPost201ResponseUserRoleEnum._('DRIVER');
const AuthRegisterPost201ResponseUserRoleEnum
    _$authRegisterPost201ResponseUserRoleEnum_RIDER =
    const AuthRegisterPost201ResponseUserRoleEnum._('RIDER');

AuthRegisterPost201ResponseUserRoleEnum
    _$authRegisterPost201ResponseUserRoleEnumValueOf(String name) {
  switch (name) {
    case 'ADMIN':
      return _$authRegisterPost201ResponseUserRoleEnum_ADMIN;
    case 'DRIVER':
      return _$authRegisterPost201ResponseUserRoleEnum_DRIVER;
    case 'RIDER':
      return _$authRegisterPost201ResponseUserRoleEnum_RIDER;
    default:
      throw ArgumentError(name);
  }
}

final BuiltSet<AuthRegisterPost201ResponseUserRoleEnum>
    _$authRegisterPost201ResponseUserRoleEnumValues = BuiltSet<
        AuthRegisterPost201ResponseUserRoleEnum>(const <AuthRegisterPost201ResponseUserRoleEnum>[
  _$authRegisterPost201ResponseUserRoleEnum_ADMIN,
  _$authRegisterPost201ResponseUserRoleEnum_DRIVER,
  _$authRegisterPost201ResponseUserRoleEnum_RIDER,
]);

Serializer<AuthRegisterPost201ResponseUserRoleEnum>
    _$authRegisterPost201ResponseUserRoleEnumSerializer =
    _$AuthRegisterPost201ResponseUserRoleEnumSerializer();

class _$AuthRegisterPost201ResponseUserRoleEnumSerializer
    implements PrimitiveSerializer<AuthRegisterPost201ResponseUserRoleEnum> {
  static const Map<String, Object> _toWire = const <String, Object>{
    'ADMIN': 'ADMIN',
    'DRIVER': 'DRIVER',
    'RIDER': 'RIDER',
  };
  static const Map<Object, String> _fromWire = const <Object, String>{
    'ADMIN': 'ADMIN',
    'DRIVER': 'DRIVER',
    'RIDER': 'RIDER',
  };

  @override
  final Iterable<Type> types = const <Type>[
    AuthRegisterPost201ResponseUserRoleEnum
  ];
  @override
  final String wireName = 'AuthRegisterPost201ResponseUserRoleEnum';

  @override
  Object serialize(Serializers serializers,
          AuthRegisterPost201ResponseUserRoleEnum object,
          {FullType specifiedType = FullType.unspecified}) =>
      _toWire[object.name] ?? object.name;

  @override
  AuthRegisterPost201ResponseUserRoleEnum deserialize(
          Serializers serializers, Object serialized,
          {FullType specifiedType = FullType.unspecified}) =>
      AuthRegisterPost201ResponseUserRoleEnum.valueOf(
          _fromWire[serialized] ?? (serialized is String ? serialized : ''));
}

class _$AuthRegisterPost201ResponseUser
    extends AuthRegisterPost201ResponseUser {
  @override
  final String? id;
  @override
  final String? email;
  @override
  final AuthRegisterPost201ResponseUserRoleEnum? role;

  factory _$AuthRegisterPost201ResponseUser(
          [void Function(AuthRegisterPost201ResponseUserBuilder)? updates]) =>
      (AuthRegisterPost201ResponseUserBuilder()..update(updates))._build();

  _$AuthRegisterPost201ResponseUser._({this.id, this.email, this.role})
      : super._();
  @override
  AuthRegisterPost201ResponseUser rebuild(
          void Function(AuthRegisterPost201ResponseUserBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  AuthRegisterPost201ResponseUserBuilder toBuilder() =>
      AuthRegisterPost201ResponseUserBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is AuthRegisterPost201ResponseUser &&
        id == other.id &&
        email == other.email &&
        role == other.role;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, id.hashCode);
    _$hash = $jc(_$hash, email.hashCode);
    _$hash = $jc(_$hash, role.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'AuthRegisterPost201ResponseUser')
          ..add('id', id)
          ..add('email', email)
          ..add('role', role))
        .toString();
  }
}

class AuthRegisterPost201ResponseUserBuilder
    implements
        Builder<AuthRegisterPost201ResponseUser,
            AuthRegisterPost201ResponseUserBuilder> {
  _$AuthRegisterPost201ResponseUser? _$v;

  String? _id;
  String? get id => _$this._id;
  set id(String? id) => _$this._id = id;

  String? _email;
  String? get email => _$this._email;
  set email(String? email) => _$this._email = email;

  AuthRegisterPost201ResponseUserRoleEnum? _role;
  AuthRegisterPost201ResponseUserRoleEnum? get role => _$this._role;
  set role(AuthRegisterPost201ResponseUserRoleEnum? role) =>
      _$this._role = role;

  AuthRegisterPost201ResponseUserBuilder() {
    AuthRegisterPost201ResponseUser._defaults(this);
  }

  AuthRegisterPost201ResponseUserBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _id = $v.id;
      _email = $v.email;
      _role = $v.role;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(AuthRegisterPost201ResponseUser other) {
    _$v = other as _$AuthRegisterPost201ResponseUser;
  }

  @override
  void update(void Function(AuthRegisterPost201ResponseUserBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  AuthRegisterPost201ResponseUser build() => _build();

  _$AuthRegisterPost201ResponseUser _build() {
    final _$result = _$v ??
        _$AuthRegisterPost201ResponseUser._(
          id: id,
          email: email,
          role: role,
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
