//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'admin_payments_top_drivers200_response_items_inner.g.dart';

/// AdminPaymentsTopDrivers200ResponseItemsInner
///
/// Properties:
/// * [driverId] 
/// * [email] 
/// * [fullName] 
/// * [trips] 
/// * [amountUsd] 
@BuiltValue()
abstract class AdminPaymentsTopDrivers200ResponseItemsInner implements Built<AdminPaymentsTopDrivers200ResponseItemsInner, AdminPaymentsTopDrivers200ResponseItemsInnerBuilder> {
  @BuiltValueField(wireName: r'driverId')
  String? get driverId;

  @BuiltValueField(wireName: r'email')
  String? get email;

  @BuiltValueField(wireName: r'fullName')
  String? get fullName;

  @BuiltValueField(wireName: r'trips')
  int? get trips;

  @BuiltValueField(wireName: r'amountUsd')
  num? get amountUsd;

  AdminPaymentsTopDrivers200ResponseItemsInner._();

  factory AdminPaymentsTopDrivers200ResponseItemsInner([void updates(AdminPaymentsTopDrivers200ResponseItemsInnerBuilder b)]) = _$AdminPaymentsTopDrivers200ResponseItemsInner;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AdminPaymentsTopDrivers200ResponseItemsInnerBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<AdminPaymentsTopDrivers200ResponseItemsInner> get serializer => _$AdminPaymentsTopDrivers200ResponseItemsInnerSerializer();
}

class _$AdminPaymentsTopDrivers200ResponseItemsInnerSerializer implements PrimitiveSerializer<AdminPaymentsTopDrivers200ResponseItemsInner> {
  @override
  final Iterable<Type> types = const [AdminPaymentsTopDrivers200ResponseItemsInner, _$AdminPaymentsTopDrivers200ResponseItemsInner];

  @override
  final String wireName = r'AdminPaymentsTopDrivers200ResponseItemsInner';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AdminPaymentsTopDrivers200ResponseItemsInner object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.driverId != null) {
      yield r'driverId';
      yield serializers.serialize(
        object.driverId,
        specifiedType: const FullType(String),
      );
    }
    if (object.email != null) {
      yield r'email';
      yield serializers.serialize(
        object.email,
        specifiedType: const FullType(String),
      );
    }
    if (object.fullName != null) {
      yield r'fullName';
      yield serializers.serialize(
        object.fullName,
        specifiedType: const FullType(String),
      );
    }
    if (object.trips != null) {
      yield r'trips';
      yield serializers.serialize(
        object.trips,
        specifiedType: const FullType(int),
      );
    }
    if (object.amountUsd != null) {
      yield r'amountUsd';
      yield serializers.serialize(
        object.amountUsd,
        specifiedType: const FullType(num),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    AdminPaymentsTopDrivers200ResponseItemsInner object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AdminPaymentsTopDrivers200ResponseItemsInnerBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'driverId':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.driverId = valueDes;
          break;
        case r'email':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.email = valueDes;
          break;
        case r'fullName':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.fullName = valueDes;
          break;
        case r'trips':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.trips = valueDes;
          break;
        case r'amountUsd':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.amountUsd = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  AdminPaymentsTopDrivers200ResponseItemsInner deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AdminPaymentsTopDrivers200ResponseItemsInnerBuilder();
    final serializedList = (serialized as Iterable<Object?>).toList();
    final unhandled = <Object?>[];
    _deserializeProperties(
      serializers,
      serialized,
      specifiedType: specifiedType,
      serializedList: serializedList,
      unhandled: unhandled,
      result: result,
    );
    return result.build();
  }
}

